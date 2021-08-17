const fs = require('fs')
const path = require('path')
const express = require('express')


const resolve = (p) => path.resolve(__dirname, p)

const app = express()
const port = 3000

const log = require("./renderer/exm")
const lof2 = require("../utilsa/ern")
const render = require("./renderer/entry-server").render
const indexProd = fs.readFileSync(resolve('./renderer/index.html'), 'utf-8')
let template = indexProd


console.log(render)
app.use(require('compression')())
app.use(
  require('serve-static')(resolve('renderer/client'), {
    index: false
  })
)

app.get('/', (req, res) => {
  const context = {}
  const appHtml = render(url, context)

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url)
  }

  const html = template.replace(`<!--app-html-->`, appHtml)

  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




module.exports = app;
