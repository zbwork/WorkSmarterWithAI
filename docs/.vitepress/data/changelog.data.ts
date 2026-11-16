import fs from 'node:fs'
import path from 'node:path'
export default {watch:['../../public/changelog.json'],load(){return JSON.parse(fs.readFileSync(path.resolve('docs/public/changelog.json'),'utf8'))}}
