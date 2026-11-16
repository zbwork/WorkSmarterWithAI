import path from 'node:path'
import fs from 'node:fs'
import sharp from 'sharp'
const files=process.argv.slice(2);if(!files.length){console.error('用法: pnpm img path/to/image.png');process.exit(1)}
for(const f of files){const out=path.join(path.dirname(f),path.parse(f).name+'.webp');if(path.resolve(f)===path.resolve(out)||fs.existsSync(out))throw Error('输出已存在，未覆盖: '+out)
 let buffer;for(const quality of [82,72,62,50,38]){buffer=await sharp(f).resize({width:1600,withoutEnlargement:true}).webp({quality}).toBuffer();if(buffer.length<=300*1024)break}if(buffer.length>300*1024)throw Error('压缩后仍超过 300KB，请缩小图片: '+f);fs.writeFileSync(out,buffer);console.log(out+' '+Math.round(buffer.length/1024)+'KB')}
