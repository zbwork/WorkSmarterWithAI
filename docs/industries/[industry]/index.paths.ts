import { contentConfig } from '../../../content.config'
import { readArticles } from '../../../scripts/content.mjs'
export default { paths() { const articles=readArticles();return contentConfig.industries.filter(i=>articles.some(a=>!a.draft&&a.status!=='deprecated'&&a.industry.includes(i.name))).map(i=>({params:{industry:i.slug,industryName:i.name,description:i.description}})) } }
