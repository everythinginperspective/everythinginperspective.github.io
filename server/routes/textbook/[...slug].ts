import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || 'polyglot-linguistics'
  const fileName = slug.endsWith('.html') ? slug : `${slug}.html`
  
  try {
    const filePath = join(process.cwd(), 'public/textbook-polyglot', fileName)
    const html = readFileSync(filePath, 'utf-8')
    
    // Remove PreTeXt header and nav
    let cleanedHtml = html
      .replace(/<header id="ptx-masthead"[\s\S]*?<\/header>/, '')
      .replace(/<nav id="ptx-navbar"[\s\S]*?<\/nav>/, '')
    
    setHeader(event, 'Content-Type', 'text/html')
    return cleanedHtml
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Textbook page not found'
    })
  }
})
