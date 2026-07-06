import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import pluralize from 'pluralize'

const contentDir = join(process.cwd(), 'content')

// Get all content type folders
const folders = readdirSync(contentDir)
  .filter(item => {
    const itemPath = join(contentDir, item)
    return statSync(itemPath).isDirectory()
  })
  .filter(folder => !folder.startsWith('.') && !folder.startsWith('_'))

const routes = []

// Generate routes for each content type
folders.forEach(folder => {
  const singular = pluralize.singular(folder)
  const plural = pluralize.plural(folder)
  
  // Get all markdown files in this folder
  const folderPath = join(contentDir, folder)
  const files = readdirSync(folderPath).filter(f => f.endsWith('.md'))
  
  files.forEach(file => {
    const slug = file.replace('.md', '')
    
    // Magazine routes
    routes.push(`/magazine/${singular}/${slug}`)
    
    // Linked data routes
    routes.push(`/linked-data/${folder}/${slug}`)
  })
  
  // Collection index routes
  routes.push(`/magazine/${plural}`)
  routes.push(`/linked-data/${plural}`)
})

// Output routes as JSON array for Nuxt config
console.log(JSON.stringify(routes, null, 2))
