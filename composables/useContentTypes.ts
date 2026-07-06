export interface ContentType {
  folder: string        // e.g., 'articles'
  singular: string      // e.g., 'article'
  plural: string        // e.g., 'articles'
  urlSingular: string   // e.g., '/magazine/article'
  urlPlural: string     // e.g., '/magazine/articles'
}

// Hardcoded content types - always available during SSR and client-side
const CONTENT_TYPES: ContentType[] = [
  { folder: 'articles', singular: 'article', plural: 'articles', urlSingular: '/magazine/article', urlPlural: '/magazine/articles' },
  { folder: 'pages', singular: 'page', plural: 'pages', urlSingular: '/magazine/page', urlPlural: '/magazine/pages' },
  { folder: 'perspectives', singular: 'perspective', plural: 'perspectives', urlSingular: '/magazine/perspective', urlPlural: '/magazine/perspectives' },
  { folder: 'books', singular: 'book', plural: 'books', urlSingular: '/magazine/book', urlPlural: '/magazine/books' },
  { folder: 'people', singular: 'person', plural: 'people', urlSingular: '/magazine/person', urlPlural: '/magazine/people' },
  { folder: 'languages', singular: 'language', plural: 'languages', urlSingular: '/magazine/language', urlPlural: '/magazine/languages' }
]

let cachedContentTypes: ContentType[] | null = null

export const useContentTypes = async () => {
  if (cachedContentTypes) {
    return cachedContentTypes
  }

  // Use hardcoded types (reliable for both SSR and client)
  cachedContentTypes = CONTENT_TYPES
  return cachedContentTypes
}

export const getContentTypeByFolder = async (folder: string): Promise<ContentType | undefined> => {
  const types = await useContentTypes()
  return types.find(t => t.folder === folder)
}

export const getContentTypeBySingular = async (singular: string): Promise<ContentType | undefined> => {
  const types = await useContentTypes()
  return types.find(t => t.singular === singular)
}

export const getContentTypeByPlural = async (plural: string): Promise<ContentType | undefined> => {
  const types = await useContentTypes()
  return types.find(t => t.plural === plural)
}
