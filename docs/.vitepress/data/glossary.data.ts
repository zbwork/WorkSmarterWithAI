import fs from 'node:fs'
import yaml from 'js-yaml'
export default {watch:['../../../glossary.yml'],load(){return yaml.load(fs.readFileSync(new URL('../../../glossary.yml',import.meta.url),'utf8'))}}
