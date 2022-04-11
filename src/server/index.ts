import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../App'
import path from 'path'
import { readFileSync } from 'fs'

const app = express()

app.get('/', (req, res) => {
  try {
    const htmlFile = readFileSync(path.resolve('./dist/index.html')).toString()
    return res.send(
      htmlFile.replace(
        '<div id="root"></div>',
        `<div id="root">${renderToString(new App({}).render())}</div>`
      )
    )
  } catch {
    return res.status(500).send('An error occurred')
  }
})
app.use(express.static(path.resolve('./dist'), { maxAge: '30d' }))
app.listen(process.env.PORT || 8080)
