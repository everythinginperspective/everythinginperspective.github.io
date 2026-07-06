import { readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'
import pluralize from 'pluralize'

const contentDir = join(process.cwd(), 'content')
const outputFile = join(process.cwd(), 'public', 'content-types.json')

// Scan content directory
const folders = readdirSync(contentDir)
  .filter(item => {
    const itemPath = join(contentDir, item)
    return statSync(itemPath).isDirectory()
  })
  .filter(folder => !folder.startsWith('.') && !folder.startsWith('_'))

// Generate content type metadata
const contentTypes = folders.map(folder => {
  const singular = pluralize.singular(folder)
  const plural = pluralize.plural(folder)

  return {
    folder,
    singular,
    plural,
    urlSingular: `/${singular}`,
    urlPlural: `/${plural}`
  }
})

// Write to public directory
writeFileSync(outputFile, JSON.stringify(contentTypes, null, 2))

console.log(`✓ Generated content types: ${contentTypes.map(t => t.folder).join(', ')}`)
console.log(`✓ Saved to ${outputFile}`)
