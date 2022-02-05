import express from 'express'
import {
  makeRequest,
  getMyRequest,
  getAllRequests,
} from './request.controller.js'

const Router = express.Router()

Router.post('/new-request', makeRequest)
Router.post('/my-requests', getMyRequest)
Router.get('/all-requests', getAllRequests)
export default Router
