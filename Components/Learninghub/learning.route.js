import express from 'express'
import upload from '../../Multer.js'
import {
  CreateLearningMaterial,
  UploadTester,
  resources,
  deleteResource,
} from './learning.controller.js'

const Router = express.Router()

Router.post('/new-entry', CreateLearningMaterial)
Router.get('/resources', resources)
Router.post('/delete-resource', deleteResource)
// Router.post('/upload-test', upload.array('image'), UploadTester)

export default Router
