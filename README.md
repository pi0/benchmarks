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
* __Node:__ `v14.17.0`
* __Run:__ Tue Jun 01 2021 02:09:29 GMT+0000 (Coordinated Universal Time)
* __Method:__ `autocannon -c 100 -d 40 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

|           | Version | Router | Requests/s | Latency | Throughput/Mb |
| :--       | --:     | --:    | :-:        | --:     | --:           |
| 0http     | 3.1.1   | ✓      | 68568.0    | 14.12   | 12.23         |
| fastify   | 3.17.0  | ✓      | 63327.2    | 15.31   | 11.29         |
| bare      | 10.13.0 | ✗      | 63247.2    | 15.32   | 11.28         |
| h3-router | 0.2.10  | ✓      | 61975.2    | 15.65   | 10.46         |
| connect   | 3.7.0   | ✗      | 61166.4    | 15.85   | 10.91         |
| h3        | 0.2.10  | ✗      | 60753.6    | 15.98   | 10.26         |
| koa       | 2.13.1  | ✗      | 45840.0    | 21.31   | 8.18          |
| express   | 4.17.1  | ✓      | 12593.8    | 78.86   | 2.25          |
