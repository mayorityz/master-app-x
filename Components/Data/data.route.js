import express from 'express'
import { EnterEntry } from './data.controller.js'

const Router = express.Router()

Router.post('/new-entry', EnterEntry)

export default Router
