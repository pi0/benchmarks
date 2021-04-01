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
* __Run:__ Thu Apr 01 2021 02:47:54 GMT+0000 (Coordinated Universal Time)
* __Method:__ `autocannon -c 100 -d 40 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|           | Version | Router | Requests/s | Latency | Throughput/Mb |
| :--       | --:     | --:    | :-:        | --:     | --:           |
| bare      | 10.13.0 | ✗      | 57420.0    | 16.94   | 10.24         |
| fastify   | 3.14.1  | ✓      | 56736.0    | 17.16   | 10.12         |
| h3        | 0.2.8   | ✗      | 53908.0    | 18.06   | 9.10          |
| connect   | 3.7.0   | ✗      | 53881.6    | 18.07   | 9.61          |
| h3-router | 0.2.8   | ✓      | 51776.0    | 18.83   | 8.74          |
| 0http     | 3.1.0   | ✓      | 44956.6    | 21.78   | 8.02          |
| koa       | 2.13.1  | ✗      | 40304.6    | 24.31   | 7.19          |
| express   | 4.17.1  | ✓      | 11334.4    | 87.67   | 2.02          |
