// serve.mjs — static file server for Arua Web Build
// Usage: node serve.mjs
// Serves project root at http://localhost:3000

import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('.', import.meta.url))
const PORT = 3000

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.jsx':  'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
}

createServer(async (req, res) => {
  let p = req.url.split('?')[0]
  if (p === '/') p = '/index.html'
  else if (p.endsWith('/')) p = p.slice(0, -1) + '/index.html'
  try {
    const buf = await readFile(join(ROOT, decodeURIComponent(p)))
    res.writeHead(200, { 'Content-Type': TYPES[extname(p).toLowerCase()] ?? 'application/octet-stream' })
    res.end(buf)
  } catch {
    res.writeHead(404)
    res.end('404 Not Found')
  }
}).listen(PORT, () => console.log(`Serving http://localhost:${PORT}`))
