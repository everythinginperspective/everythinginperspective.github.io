/**
 * Page Header Configuration
 * 
 * Rules:
 * - Any top-level folder in /pages/ will automatically generate a header with Title Case name
 * - Add folders to SUPPRESS_HEADERS to hide header completely
 * - Add folders to RENAME_HEADERS to customize header text
 * - For nested collections (like magazine), use SUB_HEADERS for second-level headers
 */

export interface PageHeaderConfig {
  label: string
  level?: 'primary' | 'secondary'
}

// Suppress headers for these top-level folders
const SUPPRESS_HEADERS = new Set(['linked-data', 'page'])

// Rename headers (folder name -> custom label)
const RENAME_HEADERS: Record<string, string> = {
  university: 'University',
  dictionary: 'Dictionary',
  encyclopedia: 'Encyclopedia',
  magazine: 'Magazine'
}

// Sub-headers for nested collections (e.g., magazine/articles, magazine/perspectives)
const SUB_HEADERS: Record<string, string> = {
  'magazine/articles': 'Articles',
  'magazine/perspectives': 'Perspectives',
  'magazine/people': 'People',
  'magazine/languages': 'Languages',
  'magazine/books': 'Books',
  'magazine/pages': 'Pages'
}

/**
 * Determine if a folder should have a header
 */
export const shouldShowHeader = (folderName: string): boolean => {
  return !SUPPRESS_HEADERS.has(folderName)
}

/**
 * Get header label for a folder (auto Title Case or custom name)
 */
export const getHeaderLabel = (folderName: string): string => {
  // Check custom renames first
  if (RENAME_HEADERS[folderName]) {
    return RENAME_HEADERS[folderName]
  }

  // Auto Title Case: split by hyphen, capitalize each word
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Get sub-header label for nested routes (e.g., magazine/articles)
 */
export const getSubHeaderLabel = (path: string): string | null => {
  // Check if it's a known sub-header
  if (SUB_HEADERS[path]) {
    return SUB_HEADERS[path]
  }
  return null
}

/**
 * Extract page level from route
 * Returns: { topLevel: 'magazine', subLevel: 'articles' } or { topLevel: 'dictionary', subLevel: null }
 */
export const usePageHeaders = () => {
  const route = useRoute()

  const pageHeader = computed(() => {
    const segments = route.path.split('/').filter(s => s)
    
    if (segments.length === 0) {
      // Home page
      return null
    }

    const topLevel = segments[0]
    const subLevel = segments[1] || null

    // Check if header should be suppressed
    if (!shouldShowHeader(topLevel)) {
      return null
    }

    const topLevelLabel = getHeaderLabel(topLevel)
    const subLevelPath = subLevel ? `${topLevel}/${subLevel}` : null
    const subLevelLabel = subLevelPath ? getSubHeaderLabel(subLevelPath) : null

    return {
      topLevel,
      topLevelLabel,
      subLevel,
      subLevelLabel,
      isSubPage: !!subLevel
    }
  })

  return {
    pageHeader
  }
}
