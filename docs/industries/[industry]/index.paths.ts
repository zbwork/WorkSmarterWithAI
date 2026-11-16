import { contentConfig } from '../../../content.config'
export default { paths() { return contentConfig.industries.map(i=>({params:{industry:i.slug,industryName:i.name,description:i.description}})) } }
