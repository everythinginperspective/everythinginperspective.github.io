/**
 * Navigation Items - Auto-generated from /pages/ folders
 * Run: npm run generate:nav
 * Last updated: 2026-07-22T02:24:07.550Z
 */

export interface NavItem {
  label: string
  href: string
}

// Available nav items (auto-discovered + filtered)
const NAV_ITEMS: NavItem[] = [
  {
    "label": "Dictionary",
    "href": "/dictionary"
  },
  {
    "label": "Encyclopedia",
    "href": "/encyclopedia"
  },
  {
    "label": "Magazine",
    "href": "/magazine/articles"
  },
  {
    "label": "Mnemonics",
    "href": "/mnemonics"
  },
  {
    "label": "University",
    "href": "/university"
  }
]

export const useNavItems = () => {
  return {
    navItems: NAV_ITEMS
  }
}
