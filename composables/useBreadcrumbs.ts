export const useBreadcrumbs = () => {
  const route = useRoute()
  
  const breadcrumbs = computed(() => {
    const crumbs: Array<{ label: string; to: string }> = [
      { label: 'Home', to: '/' }
    ]
    
    const path = route.path
    const params = route.params
    
    // Handle different route patterns
    if (path === '/') {
      return crumbs
    }
    
    // /page/[slug]
    if (path.startsWith('/page/')) {
      const slug = params.slug as string
      crumbs.push({
        label: route.meta.pageTitle || toTitleCase(slug),
        to: `/page/${slug}`
      })
      return crumbs
    }
    
    // /article/[slug] - legacy route
    if (path.startsWith('/article/')) {
      const slug = params.slug as string
      crumbs.push(
        { label: 'Articles', to: '/magazine/articles' },
        { label: route.meta.pageTitle || toTitleCase(slug), to: `/article/${slug}` }
      )
      return crumbs
    }
    
    // /magazine/[plural]
    if (path.match(/^\/magazine\/[^/]+$/) && !path.match(/^\/magazine\/[^/]+\/[^/]/)) {
      const plural = params.plural as string
      crumbs.push({
        label: toTitleCase(plural),
        to: `/magazine/${plural}`
      })
      return crumbs
    }
    
    // /magazine/[singular]/[slug]
    if (path.match(/^\/magazine\/[^/]+\/[^/]/)) {
      const singular = params.singular as string
      const slug = params.slug as string
      const plural = getPluralFromSingular(singular)
      
      crumbs.push(
        { label: toTitleCase(plural), to: `/magazine/${plural}` },
        { label: route.meta.pageTitle || toTitleCase(slug), to: `/magazine/${singular}/${slug}` }
      )
      return crumbs
    }
    
    // /linked-data/[plural]
    if (path.match(/^\/linked-data\/[^/]+$/) && !path.match(/^\/linked-data\/[^/]+\//)) {
      const plural = params.plural as string
      crumbs.push({
        label: 'Linked Data ' + toTitleCase(plural),
        to: `/linked-data/${plural}`
      })
      return crumbs
    }
    
    // /linked-data/[...slug] catchall route
    if (path.startsWith('/linked-data/')) {
      const slug = params.slug as string | string[]
      const slugArr = Array.isArray(slug) ? slug : [slug]
      const slugStr = slugArr.join('/')
      const plural = slugArr[0] // first part is the folder/plural name
      
      if (slugArr.length > 1) {
        // Item page: /linked-data/articles/streaming-wars
        crumbs.push(
          { label: 'Linked Data ' + toTitleCase(plural), to: `/linked-data/${plural}` },
          { label: route.meta.pageTitle || toTitleCase(slugArr[slugArr.length - 1]), to: path }
        )
      } else {
        // Collection page: /linked-data/articles
        crumbs.push({
          label: 'Linked Data ' + toTitleCase(plural),
          to: path
        })
      }
      return crumbs
    }
    
    return crumbs
  })
  
  return {
    breadcrumbs
  }
}

const toTitleCase = (str: string | undefined | null): string => {
  if (!str) return ''
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const getPluralFromSingular = (singular: string): string => {
  const pluralMap: Record<string, string> = {
    article: 'articles',
    perspective: 'perspectives',
    book: 'books',
    person: 'people',
    language: 'languages'
  }
  return pluralMap[singular] || singular + 's'
}
