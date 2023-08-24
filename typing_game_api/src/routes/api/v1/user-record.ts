import { Router } from 'express'

import { UserRecordController } from '../../../controllers/user-record'

const textGeneratorController = new UserRecordController()

const userRecord = Router()

userRecord.route('/submit').post(textGeneratorController.userRecord)

export default userRecord;
