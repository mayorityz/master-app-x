import express from 'express'
import { assignErp, getDrugsAssignedToChva } from './erp.controller.js'

const Router = express.Router()

Router.post('/new-entry', assignErp)
Router.post('/fetch-user-drugs', getDrugsAssignedToChva)

export default Router
