import fs from 'fs'
import path from 'path'

const contentDir = './content'
const schema = {}

// Simple YAML front matter parser
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  
  const yaml = match[1]
  const obj = {}
  
  yaml.split('\n').forEach(line => {
    if (!line.trim()) return
    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()
    
    // Handle quoted strings
    if (value.startsWith('"') && value.endsWith('"')) {
      obj[key.trim()] = value.slice(1, -1)
    } else if (value.startsWith('[') && value.endsWith(']')) {
      obj[key.trim()] = value
    } else if (value === 'true' || value === 'false') {
      obj[key.trim()] = value === 'true'
    } else {
      obj[key.trim()] = value
    }
  })
  
  return obj
}

// Scan all content types
fs.readdirSync(contentDir).forEach(type => {
  const typeDir = path.join(contentDir, type)
  if (!fs.statSync(typeDir).isDirectory()) return
  
  const files = fs.readdirSync(typeDir).filter(f => f.endsWith('.md'))
  if (files.length === 0) return
  
  const fields = {}
  const examples = {}
  
  // Analyze each file
  files.forEach(file => {
    const content = fs.readFileSync(path.join(typeDir, file), 'utf-8')
    const attributes = parseFrontMatter(content)
    
    // Track fields
    Object.entries(attributes).forEach(([key, value]) => {
      if (!fields[key]) {
        fields[key] = { count: 0, types: new Set() }
      }
      fields[key].count++
      fields[key].types.add(typeof value)
      
      if (!examples[key]) {
        examples[key] = value
      }
    })
  })
  
  // Convert Sets to Arrays
  const fieldsData = {}
  Object.entries(fields).forEach(([key, data]) => {
    fieldsData[key] = {
      present_in: `${data.count}/${files.length} files`,
      types: Array.from(data.types),
      example: examples[key]
    }
  })
  
  schema[type] = {
    template: `pages/${type}/[slug].vue`,
    total_items: files.length,
    fields: fieldsData
  }
})

// Write output
const output = JSON.stringify(schema, null, 2)
fs.writeFileSync('./SCHEMA.json', output)

console.log('✅ Schema discovered and saved to SCHEMA.json')
console.log(output)
