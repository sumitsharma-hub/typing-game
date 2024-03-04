import path from 'path'

import 'dotenv/config'

export const BASE_DIR: string = path.dirname(path.dirname(__filename))

export const MONGO_URI: string = String(process.env.MONGO_URI)
