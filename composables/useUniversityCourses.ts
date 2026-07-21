/**
 * University Courses - Auto-generated from /public/university/ folders
 * Run: npm run generate:courses
 * Last updated: 2026-07-21T04:29:40.770Z
 */

export interface UniversityCourse {
  name: string
  label: string
  description: string
}

// Available courses (auto-discovered + metadata)
const COURSES: UniversityCourse[] = [
  {
    name: 'course-AIuniverse',
    label: 'AIuniverse',
    description: 'Interactive course content'
  },
  {
    name: 'course-engineering-through-making',
    label: 'Engineering Through Making',
    description: 'Hands-on engineering principles and practice'
  },
  {
    name: 'course-multilingual',
    label: 'How To Be Multilingual FAST',
    description: 'Learning Languages Through Comparative Study'
  },
  {
    name: 'course-quantum-theories',
    label: 'Quantum Theories',
    description: 'Interactive course on quantum mechanics'
  }
]

export const useUniversityCourses = () => {
  return {
    courses: COURSES
  }
}
