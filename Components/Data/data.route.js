import express from 'express'
import { EnterEntry, getDatabyChva } from './data.controller.js'

const Router = express.Router()

Router.post('/new-entry', EnterEntry)
Router.post('/fetchData', getDatabyChva)

export default Router
