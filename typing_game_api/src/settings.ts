import path from 'path'

import dotenv from 'dotenv'

dotenv.config()

export const BASE_DIR: string = path.dirname(path.dirname(__filename))

export const MONGO_URI: string = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:8000/typinggame'
