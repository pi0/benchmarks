#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')
const Table = require('cli-table')
const { join } = require('path')
const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { compare } = require('./lib/autocannon')
const { info } = require('./lib/packages')
const commander = require('commander')

commander
  .option('-t, --table', 'table')
  .option('-p, --percentage', 'percentage')
  .option('-c --commandlineMdTable', 'Print a table for use in MarkDown')
  .parse(process.argv)

const resultsPath = join(process.cwd(), 'results')
let choices = readdirSync(resultsPath)
  .filter((file) => file.match(/(.+)\.json$/))
  .sort()
  .map((choice) => choice.replace('.json', ''))

const bold = (writeBold, str) => writeBold ? chalk.bold(str) : str

const formatHasRouter = hasRouter => typeof hasRouter === 'string' ? hasRouter : (hasRouter ? '✓' : '✗')

if (!choices.length) {
  console.log(chalk.red('Benchmark to gather some results to compare.'))
} else if (commander.table && !commander.percentage) {
  const tableSeparatorChars = commander.commandlineMdTable
    ? {
      top: '',
      'top-left': '',
      'top-mid': '',
      'top-right': '',
      bottom: '',
      'bottom-left': '',
      'bottom-mid': '',
      'bottom-right': '',
      mid: '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': '',
      left: '|',
      right: '|',
      middle: '|'
    }
    : {}
  const table = new Table({
    chars: tableSeparatorChars,
    head: ['', 'Version', 'Router', 'Requests/s', 'Latency', 'Throughput/Mb']
  })
  if (commander.commandlineMdTable) {
    table.push([':--', '--:', '--:', ':-:', '--:', '--:'])
  }

  const arrayObjChoices = []
  choices.map(file => {
    let content = readFileSync(`${resultsPath}/${file}.json`)
    return JSON.parse(content.toString())
  })
    .sort((a, b) => {
      return parseFloat(b.requests.mean) - parseFloat(a.requests.mean)
    })
    .forEach((data) => {
      const beBold = data.server === 'fastify'
      const { hasRouter = false, version } = info(data.server) || {}

      const {
        requests: { average: requests },
        latency: { average: latency },
        throughput: { average: throughput }
      } = data

      arrayObjChoices.push(
        {
          name: data.server,
          version,
          hasRouter,
          requests: requests ? requests.toFixed(1) : 'N/A',
          latency: latency ? latency.toFixed(2) : 'N/A',
          throughput: throughput ? (throughput / 1024 / 1024).toFixed(2) : 'N/A'
        }
      )

      table.push([
        bold(beBold, chalk.blue(data.server)),
        bold(beBold, version),
        bold(beBold, formatHasRouter(hasRouter)),
        bold(beBold, requests ? requests.toFixed(1) : 'N/A'),
        bold(beBold, latency ? latency.toFixed(2) : 'N/A'),
        bold(beBold, throughput ? (throughput / 1024 / 1024).toFixed(2) : 'N/A')
      ])
    })

  console.log(table.toString())
  writeFileSync('benchmark-results.json', JSON.stringify(arrayObjChoices), 'utf8')
} else if (commander.percentage) {
  let data = []
  choices.forEach(file => {
    let content = readFileSync(`${resultsPath}/${file}.json`)
    data.push(JSON.parse(content.toString()))
  })
  data.sort((a, b) => {
    return parseFloat(b.requests.mean) - parseFloat(a.requests.mean)
  })
  const base = Object.assign({}, {
    name: data[0].server,
    request: data[0].requests.mean,
    latency: data[0].latency.mean,
    throughput: data[0].throughput.mean
  })
  const table = new Table({
    head: [
      '',
      'Version',
      'Router',
      `Requests/s\n(% of ${base.name})`,
      `Latency\n(% of ${base.name})`,
      `Throughput/Mb\n(% of ${base.name})`
    ]
  })
  const arrayObjChoices = []
  data.forEach(result => {
    const beBold = result.server === 'fastify'
    const { hasRouter = false, version } = info(result.server) || {}
    const getPct = (base, value) => ((value / base * 100).toFixed(2))

    arrayObjChoices.push(
      {
        name: result.server,
        version,
        hasRouter,
        requests: result.requests.mean,
        latency: result.latency.mean,
        throughput: (result.throughput.mean / 1024 / 1024).toFixed(2)
      }
    )

    table.push([
      bold(beBold, chalk.blue(result.server)),
      bold(beBold, version),
      bold(beBold, formatHasRouter(hasRouter)),
      bold(beBold, `${result.requests.mean}\n(${getPct(base.request, result.requests.mean)})`),
      bold(beBold, `${result.latency.mean}\n(${getPct(base.latency, result.latency.mean)})`),
      bold(beBold, `${(result.throughput.mean / 1024 / 1024).toFixed(2)}\n(${getPct(base.throughput, result.throughput.mean)})`)
    ])
  })

  console.log(table.toString())
  writeFileSync('benchmark-results.json', JSON.stringify(arrayObjChoices), 'utf8')
} else {
  inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: 'What\'s your first pick?',
    choices
  }]).then((firstChoice) => {
    choices = choices.filter(choice => choice !== firstChoice.choice)
    inquirer.prompt([{
      type: 'list',
      name: 'choice',
      message: 'What\'s your second one?',
      choices
    }]).then((secondChoice) => {
      const [a, b] = [firstChoice.choice, secondChoice.choice]
      const result = compare(a, b)
      if (result === true) {
        console.log(chalk.green.bold(`${a} and ${b} both are fast!`))
      } else {
        const fastest = chalk.bold.yellow(result.fastest)
        const fastestAverage = chalk.green(result.fastestAverage)
        const slowest = chalk.bold.yellow(result.slowest)
        const slowestAverage = chalk.green(result.slowestAverage)
        const diff = chalk.bold.green(result.diff)

        console.log(`
 ${chalk.blue('Both are awesome but')} ${fastest} ${chalk.blue('is')} ${diff} ${chalk.blue('faster than')} ${slowest}
 • ${fastest} ${chalk.blue('request average is')} ${fastestAverage}
 • ${slowest} ${chalk.blue('request average is')} ${slowestAverage}`)
      }
    })
  })
}
