import { Link, Route, Switch } from 'react-router-dom'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import


// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.globEager('./pages/*.jsx')

// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
//   return {
//     name,
//     path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
//     component: pages[path].default
//   }
// })
import React from "react"



export function App() {
  return (
    <>
      <div> Hello World</div>
    </>
  )
}
