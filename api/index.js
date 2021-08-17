const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
const port = 3000

const log = require("./renderer/exm")
const lof2 = require("../utilsa/ern")
const render = require("../dist/server/entry-server")
console.log(render)

app.get('/', (req, res) => {
  lof2("ki")

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




module.exports = app;
