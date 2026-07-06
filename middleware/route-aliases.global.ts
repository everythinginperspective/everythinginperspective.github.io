export default defineNuxtRouteMiddleware((to) => {
  const path = to.path
  
  // Handle /mag/* -> /magazine/*
  if (path.startsWith('/mag/') || path === '/mag') {
    const newPath = path.replace('/mag', '/magazine')
    return navigateTo(newPath, { redirectCode: 301 })
  }
  
  // Handle /ld/* -> /linked-data/*
  if (path.startsWith('/ld/') || path === '/ld') {
    const newPath = path.replace('/ld', '/linked-data')
    return navigateTo(newPath, { redirectCode: 301 })
  }
})
