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
* __Node:__ `v14.16.1`
* __Run:__ Sat May 01 2021 00:53:17 GMT+0000 (Coordinated Universal Time)
* __Method:__ `autocannon -c 100 -d 40 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|           | Version | Router | Requests/s | Latency | Throughput/Mb |
| :--       | --:     | --:    | :-:        | --:     | --:           |
| fastify   | 3.15.1  | ✓      | 59216.8    | 16.41   | 10.56         |
| bare      | 10.13.0 | ✗      | 58838.4    | 16.50   | 10.49         |
| connect   | 3.7.0   | ✗      | 56980.0    | 17.05   | 10.16         |
| 0http     | 3.1.0   | ✓      | 56337.6    | 17.25   | 10.05         |
| h3        | 0.2.10  | ✗      | 54546.4    | 17.84   | 9.21          |
| h3-router | 0.2.10  | ✓      | 53984.0    | 18.03   | 9.11          |
| koa       | 2.13.1  | ✗      | 43535.8    | 22.48   | 7.76          |
| express   | 4.17.1  | ✓      | 11284.8    | 88.07   | 2.01          |
