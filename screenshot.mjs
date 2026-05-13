// screenshot.mjs — Puppeteer screenshot tool
// Usage: node screenshot.mjs [url] [label]
//   url   defaults to http://localhost:3000
//   label optional suffix → screenshot-N-label.png
// Screenshots auto-increment into ./temporary screenshots/

import puppeteer from 'puppeteer'
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('.', import.meta.url))
const DIR  = join(ROOT, 'temporary screenshots')
const url  = process.argv[2] ?? 'http://localhost:3000'
const label = process.argv[3]

await mkdir(DIR, { recursive: true })

const files = await readdir(DIR).catch(() => [])
const n = files.reduce((max, f) => {
  const m = f.match(/^screenshot-(\d+)/)
  return m ? Math.max(max, +m[1]) : max
}, 0) + 1

const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`
const outPath  = join(DIR, filename)

console.log(`Capturing ${url} …`)

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 })
await new Promise(r => setTimeout(r, 1200)) // let fonts + animations settle
await page.screenshot({ path: outPath, fullPage: true })
await browser.close()

console.log(`Saved → ${outPath}`)
