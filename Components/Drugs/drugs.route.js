import express from 'express'
import { createDrug, getAllDrugs, editDrugs } from './drugs.controller.js'

const Router = express.Router()

Router.post('/new-drug-entry', createDrug)
Router.get('/all-drugs', getAllDrugs)
Router.post('/edit-drug', editDrugs)

export default Router
