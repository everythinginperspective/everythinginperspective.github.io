import { readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

// Read SUPPRESS_HEADERS and RENAME_HEADERS from usePageHeaders.ts
const suppressHeaders = ['linked-data', 'page']
const renameHeaders = {
  university: 'University',
  dictionary: 'Dictionary',
  encyclopedia: 'Encyclopedia',
  magazine: 'Magazine',
  mnemonics: 'Mnemonics'
}

// Custom URLs for specific sections
const customUrls = {
  magazine: '/magazine/articles'
}

const pagesDir = join(process.cwd(), 'pages')

// Read all top-level page folders
const pageFolders = readdirSync(pagesDir)
  .filter(item => {
    const itemPath = join(pagesDir, item)
    try {
      return statSync(itemPath).isDirectory() && !item.startsWith('.') && !item.startsWith('[')
    } catch {
      return false
    }
  })
  .sort()

// Helper to convert folder name to Title Case
const toTitleCase = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Generate nav items
const navItems = pageFolders
  .filter(folder => !suppressHeaders.includes(folder))
  .map(folder => ({
    label: renameHeaders[folder] || toTitleCase(folder),
    href: customUrls[folder] || `/${folder}`
  }))

// Generate composable
const composableContent = `/**
 * Navigation Items - Auto-generated from /pages/ folders
 * Run: npm run generate:nav
 * Last updated: ${new Date().toISOString()}
 */

export interface NavItem {
  label: string
  href: string
}

// Available nav items (auto-discovered + filtered)
const NAV_ITEMS: NavItem[] = ${JSON.stringify(navItems, null, 2)}

export const useNavItems = () => {
  return {
    navItems: NAV_ITEMS
  }
}
`

// Write composable
const composablePath = join(process.cwd(), 'composables', 'useNavItems.ts')
writeFileSync(composablePath, composableContent)

console.log(`✓ Generated ${composablePath}`)
console.log(`✓ Discovered ${pageFolders.length} folders, ${navItems.length} nav items after filtering`)
console.log(`  Nav items: ${navItems.map(i => i.label).join(', ')}`)
