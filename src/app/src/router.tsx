// src/router.tsx
import { createHashHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const hashHistory = createHashHistory()
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    history: hashHistory
  })

  return router
}
