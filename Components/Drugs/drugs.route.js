import express from 'express'
import {
  createDrug,
  getAllDrugs,
  editDrugs,
  deleteDrug,
} from './drugs.controller.js'

const Router = express.Router()

Router.post('/new-drug-entry', createDrug)
Router.get('/all-drugs', getAllDrugs)
Router.post('/edit-drug', editDrugs)
Router.post('/remove-drug', deleteDrug)

export default Router
