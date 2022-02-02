import express from 'express'
import { createDrug, getAllDrugs } from './drugs.controller.js'

const Router = express.Router()

Router.post('/new-drug-entry', createDrug)
Router.get('/all-drugs', getAllDrugs)

export default Router
