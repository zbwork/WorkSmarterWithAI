import fs from 'node:fs'
import path from 'node:path'
export default {watch:['../../public/downloads-manifest.json'],load(){return JSON.parse(fs.readFileSync(path.resolve('docs/public/downloads-manifest.json'),'utf8'))}}
