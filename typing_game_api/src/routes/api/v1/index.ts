import { Router } from 'express'

import accounts from './accounts'

const urlpatterns: Map<string, Router> = new Map<string, Router>([['/accounts', accounts]])

const v1 = Router()
urlpatterns.forEach((router: Router, prefix: string) => {
  v1.use(prefix, router)
})

export default v1
