import express from 'express'
import upload from '../../Multer.js'
import {
  CreateLearningMaterial,
  resources,
  deleteResource,
  fetchResourceByType,
  findResourceById,
  getActivities,
  createNewActivity,
  postComment,
  fetchComments,
} from './learning.controller.js'

const Router = express.Router()

Router.post('/new-entry', CreateLearningMaterial)
Router.get('/resources', resources)
Router.post('/delete-resource', deleteResource)
Router.post('/fetch-resource', fetchResourceByType)
Router.post('/fetch-resource-by-id', findResourceById)
Router.post('/activities', getActivities)
Router.post('/new-activity', createNewActivity)
Router.post('/post-comment', postComment)
Router.post('/fetch-comment', fetchComments)
// Router.post('/upload-test', upload.array('image'), UploadTester)

export default Router
