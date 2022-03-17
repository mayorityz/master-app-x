import express from 'express'
import {
  makeRequest,
  getMyRequest,
  getAllRequests,
  readRequest,
  updateArequest,
} from './request.controller.js'

const Router = express.Router()

Router.post('/new-request', makeRequest)
Router.post('/my-requests', getMyRequest)
Router.get('/all-requests', getAllRequests)
Router.post('/read-request', readRequest)
Router.post('/update-request', updateArequest)
export default Router
