import express from 'express'
import {
  EnterEntry,
  getDatabyChva,
  chvaRequest,
  myRequests,
  PendingReqs,
  makeAsComplete,
} from './data.controller.js'

const Router = express.Router()

Router.post('/new-entry', EnterEntry)
Router.post('/fetchData', getDatabyChva)
Router.post('/saverequest', chvaRequest)
Router.post('/my-requests', myRequests)
Router.get('/pending-request', PendingReqs)
Router.post('/make-as-complete', makeAsComplete)

export default Router
