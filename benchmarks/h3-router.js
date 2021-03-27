'use strict'

const { createServer } = require('http')
const { createApp } = require('h3')

const app = createApp()

app.useAsync('/', () => ({ hello: 'world' }), {
  match: (url, req) => url === '/' && req.method === 'GET'
})

createServer(app).listen(process.env.PORT || 3000)
