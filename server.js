const fs = require('fs')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')


console.log(process.version);


const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {

  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const app = express()


  app.set('trust proxy', 1) // trust first proxy
 
  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))




  app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    req.session.views = (req.session.views || 0) + 1
    console.log(req.session.views)
    console.log(req.originalUrl)
    next()
  })

  
  app.get("/ses", (req,res)=>{

    res.send("hoo"+req.session.views+"ll+")


  })

  var config = require('./api/configs/' + 'dev' + '.config')
  mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
  
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));


  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
    app.use(bodyParser.json())
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  }

  

  await require('./api/routes/index')(app);
  app.use(cors())
  

  app.use('/*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('./client/src/entry-server.jsx')).render

      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }

      const context = {}
      const appHtml = render(url, context)

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url)
      }

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })
    
    
app.get('/', (req, res) => res.send('Home Page Route'));


  return { app }
}


createServer().then(({ app }) =>
                 
  app.listen((process.env.PORT || 4000), () => {
    console.log('http://localhost:3000')

  }))






// const express = require('express');
// console.log("runing server");
// const app = express();

// app.get('/', (req, res) => res.send('Home Page Route'));

// app.get('/about', (req, res) => res.send('About Page Route'));

// app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

// app.get('/contact', (req, res) => res.send('Contact Page Route'));

// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));


