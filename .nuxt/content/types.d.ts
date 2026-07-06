import type { PageCollectionItemBase, DataCollectionItemBase } from '@nuxt/content'

declare module '@nuxt/content' {
   interface ArticlesCollectionItem extends PageCollectionItemBase {
    author?: string
    date?: string
    category?: string
    tags?: string[]
    keywords?: string
    image?: string
    imageAlt?: string
    authorBio?: string
  }
  
   interface PerspectivesCollectionItem extends PageCollectionItemBase {
    author?: string
    date?: string
    category?: string
    tags?: string[]
    keywords?: string
    image?: string
    imageAlt?: string
    authorBio?: string
  }
  
   interface PagesCollectionItem extends PageCollectionItemBase {}
  
   interface BooksCollectionItem extends PageCollectionItemBase {
    author?: string
    date?: string
    category?: string
    tags?: string[]
    keywords?: string
    image?: string
    imageAlt?: string
    authorBio?: string
  }
  
   interface PeopleCollectionItem extends PageCollectionItemBase {
    name?: string
    role?: string
    image?: string
  }
  
   interface LanguagesCollectionItem extends PageCollectionItemBase {}
  

  interface PageCollections {
    articles: ArticlesCollectionItem
    perspectives: PerspectivesCollectionItem
    pages: PagesCollectionItem
    books: BooksCollectionItem
    people: PeopleCollectionItem
    languages: LanguagesCollectionItem
  }

  interface Collections {
    articles: ArticlesCollectionItem
    perspectives: PerspectivesCollectionItem
    pages: PagesCollectionItem
    books: BooksCollectionItem
    people: PeopleCollectionItem
    languages: LanguagesCollectionItem
  }
}
