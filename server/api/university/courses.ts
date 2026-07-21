import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const coursesDir = join(process.cwd(), 'public', 'courses')
    
    // Read all folders in /public/courses
    const items = readdirSync(coursesDir).filter(item => {
      const itemPath = join(coursesDir, item)
      return statSync(itemPath).isDirectory()
    })
    
    return items
  } catch (error) {
    console.error('Error reading courses directory:', error)
    return []
  }
})
