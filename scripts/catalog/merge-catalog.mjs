/**
 * 合并 scripts/catalog/part-*.mjs 导出数组，写入 src/data/grammar-n2n3.json
 * 运行：node scripts/catalog/merge-catalog.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import part01 from './part-01.mjs'
import part02 from './part-02.mjs'
import part03 from './part-03.mjs'
import part04 from './part-04.mjs'
import part05 from './part-05.mjs'
import part06 from './part-06.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..', '..')

const rows = [...part01, ...part02, ...part03, ...part04, ...part05, ...part06]

const items = rows.map((row, i) => ({
  id: i + 1,
  level: row.level ?? 'N2',
  tag: row.tag,
  pattern: row.pattern,
  meaning: row.meaning,
  usages: row.usages,
}))

const out = { version: 3, items }
const dest = path.join(root, 'src', 'data', 'grammar-n2n3.json')
fs.writeFileSync(dest, JSON.stringify(out, null, 2), 'utf8')
console.log('Wrote', dest, 'count:', items.length)
