import { readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

// Course metadata with custom labels/descriptions
const courseMetadata = {
  'course-multilingual': {
    label: 'How To Be Multilingual FAST',
    description: 'Learning Languages Through Comparative Study'
  },
  'course-quantum-theories': {
    label: 'Quantum Theories',
    description: 'Interactive course on quantum mechanics'
  },
  'course-engineering-through-making': {
    label: 'Engineering Through Making',
    description: 'Hands-on engineering principles and practice'
  },
  'course-ai-universe': {
    label: 'Traversing the Universe of AI',
    description: 'Exploring artificial intelligence and machine learning'
  }
}

const universityDir = join(process.cwd(), 'public', 'university')

// Read all course folders
let courseNames = []
try {
  courseNames = readdirSync(universityDir)
    .filter(item => {
      const itemPath = join(universityDir, item)
      return statSync(itemPath).isDirectory() && item.startsWith('course-')
    })
    .sort()
} catch (error) {
  console.warn(`⚠️  ${universityDir} not found. Using default course list.`)
  courseNames = Object.keys(courseMetadata).sort()
}

// Helper function
const toTitleCase = (str) => {
  return str
    .replace('course-', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Generate composable content
const composableContent = `/**
 * University Courses - Auto-generated from /public/university/ folders
 * Run: npm run generate:courses
 * Last updated: ${new Date().toISOString()}
 */

export interface UniversityCourse {
  name: string
  label: string
  description: string
}

// Available courses (auto-discovered + metadata)
const COURSES: UniversityCourse[] = [
${courseNames
  .map(
    name => `  {
    name: '${name}',
    label: '${courseMetadata[name]?.label || toTitleCase(name)}',
    description: '${courseMetadata[name]?.description || 'Interactive course content'}'
  }`
  )
  .join(',\n')}
]

export const useUniversityCourses = () => {
  return {
    courses: COURSES
  }
}
`

// Write to composable
const composablePath = join(process.cwd(), 'composables', 'useUniversityCourses.ts')
writeFileSync(composablePath, composableContent)

console.log(`✓ Generated ${composablePath}`)
console.log(`✓ Discovered ${courseNames.length} courses: ${courseNames.join(', ')}`)
