<div align="center">
<img src="https://github.com/fastify/graphics/raw/master/full-logo.png" width="650" height="auto"/>
</div>

<div align="center">

[![CI](https://github.com/fastify/fastify/workflows/ci/badge.svg)](https://github.com/fastify/fastify/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/fastify/fastify/badge.svg?branch=master)](https://coveralls.io/github/fastify/fastify?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![NPM version](https://img.shields.io/npm/v/fastify.svg?style=flat)](https://www.npmjs.com/package/fastify)
[![NPM downloads](https://img.shields.io/npm/dm/fastify.svg?style=flat)](https://www.npmjs.com/package/fastify) [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/fastify)
</div>
<br />

# TL;DR

* [Fastify](https://github.com/fastify/fastify) is a fast and low overhead web framework for Node.js.
* This package shows how fast it is comparatively.

# Installing

```
npm i -g fastify-benchmarks
```

# Usage

```
benchmark [arguments (optional)]
```

#### Arguments

* `-h`: Help on how to use the tool.
* `compare`: Get comparative data for your benchmarks.

> You may also compare all test results, at once, in a single table; `benchmark compare -t`

> You can also extend the comparison table with percentage values based on fastest result; `benchmark compare -p`
# Benchmarks

* __Machine:__ linux x64 | 2 vCPUs | 6.8GB Mem
* __Node:__ `v14.16.0`
* __Run:__ Sat Mar 27 2021 18:52:20 GMT+0000 (Coordinated Universal Time)
* __Method:__ `autocannon -c 100 -d 40 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|           | Version | Router | Requests/s | Latency | Throughput/Mb |
| :--       | --:     | --:    | :-:        | --:     | --:           |
| h3        | 0.2.8   | ✗      | 35946.6    | 27.36   | 6.07          |
| h3-router | 0.2.8   | ✓      | 34100.0    | 28.84   | 5.76          |
| 0http     | 3.1.0   | ✓      | 34036.8    | 28.89   | 6.07          |
| bare      | 10.13.0 | ✗      | 33772.0    | 29.12   | 6.02          |
| fastify   | 3.14.1  | ✓      | 33289.6    | 29.55   | 5.94          |
| connect   | 3.7.0   | ✗      | 32227.2    | 30.54   | 5.75          |
| koa       | 2.13.1  | ✗      | 23280.0    | 42.48   | 4.15          |
| express   | 4.17.1  | ✓      | 7751.2     | 128.38  | 1.38          |
