const fs = require('fs')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")

const resolve = (p) => path.resolve(__dirname, p)

const app = express()
const port = 3000

var config = require('./api/configs/' + 'dev' + '.config')
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors())

const render = require("../dist/server/entry-server").render

let template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script type="module" crossorigin src="/assets/index.493e5aec.js"></script>
    <link rel="modulepreload" href="/assets/vendor.2d9ed0d6.js">
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    
  </body>
</html>
`


console.log(render)

await require('./routes/index')(app);

app.use(require('compression')())
app.use(
  require('serve-static')(resolve('../dist/client'), {
    index: false
  })
)

app.get('/', (req, res) => {
  const url = req.originalUrl;
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
