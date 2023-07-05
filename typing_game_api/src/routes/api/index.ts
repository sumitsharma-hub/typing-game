import { Router } from 'express'

import v1 from './v1'

const urlpatterns: Map<string, Router> = new Map<string, Router>([['/v1', v1]])

const api = Router()
urlpatterns.forEach((router: Router, prefix: string) => {
  api.use(prefix, router)
})

export default api
