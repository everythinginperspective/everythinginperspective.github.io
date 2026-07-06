import fs from 'fs'
import path from 'path'

const contentDir = './content'
const outputPath = './public/graph.json'

// Parse front matter
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  
  const yaml = match[1]
  const obj = {}
  
  yaml.split('\n').forEach(line => {
    if (!line.trim()) return
    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()
    
    if (value.startsWith('"') && value.endsWith('"')) {
      obj[key.trim()] = value.slice(1, -1)
    } else if (value.startsWith('[') && value.endsWith(']')) {
      obj[key.trim()] = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''))
    } else {
      obj[key.trim()] = value
    }
  })
  
  return obj
}

// Slugify helper
function slugify(text) {
  return text?.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '') || ''
}

// Build the graph
const graph = {}
const entities = {
  authors: new Set(),
  categories: new Set(),
  tags: new Set()
}

console.log('🔍 Scanning content...')

// Scan all content types
fs.readdirSync(contentDir).forEach(contentType => {
  const typeDir = path.join(contentDir, contentType)
  if (!fs.statSync(typeDir).isDirectory()) return
  
  const files = fs.readdirSync(typeDir).filter(f => f.endsWith('.md'))
  
  files.forEach(file => {
    const slug = file.replace('.md', '')
    const itemPath = `${contentType}/${slug}`
    const content = fs.readFileSync(path.join(typeDir, file), 'utf-8')
    const frontMatter = parseFrontMatter(content)
    
    graph[itemPath] = {
      title: frontMatter.title || slug,
      type: contentType,
      slug,
      links_to: [],
      linked_from: [],
      metadata: frontMatter
    }
    
    // Extract potential references
    if (frontMatter.author) {
      const authorSlug = slugify(frontMatter.author)
      entities.authors.add(authorSlug)
      graph[itemPath].links_to.push(`author/${authorSlug}`)
    }
    
    if (frontMatter.category) {
      const categorySlug = slugify(frontMatter.category)
      entities.categories.add(categorySlug)
      graph[itemPath].links_to.push(`category/${categorySlug}`)
    }
    
    if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
      frontMatter.tags.forEach(tag => {
        const tagSlug = slugify(tag)
        entities.tags.add(tagSlug)
        graph[itemPath].links_to.push(`tag/${tagSlug}`)
      })
    }
  })
})

console.log(`✅ Found ${Object.keys(graph).length} content items`)

// Build backlinks
console.log('🔗 Building backlinks...')
Object.entries(graph).forEach(([itemPath, item]) => {
  item.links_to.forEach(targetPath => {
    if (!graph[targetPath]) {
      // Create entity node if it doesn't exist
      graph[targetPath] = {
        title: targetPath.split('/')[1].replace(/-/g, ' '),
        type: targetPath.split('/')[0],
        slug: targetPath.split('/')[1],
        links_to: [],
        linked_from: [],
        metadata: {}
      }
    }
    graph[targetPath].linked_from.push(itemPath)
  })
})

// Calculate N-degree relationships
console.log('🌐 Calculating N-degree relationships...')
function getNDegreeLinks(itemPath, maxDegree = 3, visited = new Set()) {
  if (maxDegree === 0 || visited.has(itemPath)) return {}
  
  visited.add(itemPath)
  const item = graph[itemPath]
  if (!item) return {}
  
  const degrees = {
    1: [...item.links_to, ...item.linked_from].filter(p => p !== itemPath)
  }
  
  // Calculate higher degrees
  for (let degree = 2; degree <= maxDegree; degree++) {
    degrees[degree] = []
    const prevDegree = degrees[degree - 1]
    
    prevDegree.forEach(connectedPath => {
      if (graph[connectedPath]) {
        const connections = [...graph[connectedPath].links_to, ...graph[connectedPath].linked_from]
        connections.forEach(c => {
          if (!visited.has(c) && c !== itemPath && !degrees[degree].includes(c)) {
            degrees[degree].push(c)
          }
        })
      }
    })
  }
  
  return degrees
}

// Add N-degree data to each node
Object.keys(graph).forEach(itemPath => {
  graph[itemPath].degrees = getNDegreeLinks(itemPath, 3)
})

// Save graph
console.log('💾 Saving graph...')
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true })
}
fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2))

console.log(`✨ Graph generated: ${outputPath}`)
console.log(`   Total nodes: ${Object.keys(graph).length}`)
console.log(`   Authors: ${entities.authors.size}`)
console.log(`   Categories: ${entities.categories.size}`)
console.log(`   Tags: ${entities.tags.size}`)
