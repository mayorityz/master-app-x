import express from 'express'
import { assignErp } from './erp.controller.js'

const Router = express.Router()

Router.post('/new-entry', assignErp)

export default Router
