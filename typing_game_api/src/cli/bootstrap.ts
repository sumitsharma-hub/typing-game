import { Server, type ServerOptions } from 'http'

import express, { type Application, type Router } from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { authenticate } from '../middlewares'
import urlpatterns from '../routes'
import { MONGO_URI } from '../settings'

export function getRequestListener (): Application {
  const application: Application = express()
  application.use(helmet())
  application.use(express.urlencoded({ extended: true }))
  application.use(express.json())
  application.use(morgan('combined'))
  application.use(authenticate)

  urlpatterns.forEach((router: Router, prefix: string) => {
    application.use(prefix, router)
  })

  return application
}

export default async function bootstrap (port: number, host: string): Promise<void> {
  const requestListener: Application = getRequestListener()

  const options: ServerOptions = {}
  const server: Server = new Server(options, requestListener)

  await mongoose.connect(MONGO_URI)
  server.listen(port, host, () => {
    console.log(server.address())
  })
}
