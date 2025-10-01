import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import tipsRouter from './routes/events.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/scripts', express.static(path.join(__dirname, 'public', 'scripts')))

app.get('/api', (_req, res) => {
  res.status(200).send('<h1 style="text-align:center;margin-top:40px;">Young Entrepreneur Tips API</h1>')
})

app.use('/events', tipsRouter)

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/events/:slug', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'event.html'))
})

app.use((_, res) => {
  res.status(404).sendFile(path.resolve(__dirname, 'public', '404.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
