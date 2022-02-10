import Learning from './learning.model.js'
import fs from 'fs'
// import { uploads } from '../../Cloudinary.js'

export const CreateLearningMaterial = async (req, res) => {
  try {
    let { title, type, link, description } = req.body
    let upload = new Learning({ title, type, link, description })
    upload.save((er, data) => {
      if (er) {
        return res.status(500).json({ message: er.message, statu: 500 })
      }
      res.status(200).json({ message: 'upload successful', status: 200 })
    })
  } catch (error) {
    res.status(500).json({ message: 'internal server error', status: 500 })
  }
}

export const resources = async (req, res) => {
  try {
    Learning.find({}, (er, data) => {
      if (er) {
        return res.status(500).json({ message: er.message, statu: 500 })
      }
      res.status(200).json({ message: 'success', status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: 'internal server error', status: 500 })
  }
}

export const deleteResource = async (req, res) => {
  try {
    let { id } = req.body
    console.log(id)
    Learning.deleteOne({ _id: id }, (er, data) => {
      if (er) {
        return res.status(500).json({ message: er.message, statu: 500 })
      }
      res.status(200).json({ message: 'deleted successfully', status: 200 })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const fetchResourceByType = async (req, res) => {
  try {
    let { type } = req.body
    Learning.find({ type }, (er, data) => {
      if (er) {
        return res.status(500).json({ message: er.message, statu: 500 })
      }
      res.status(200).json({ message: 'success', status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const UploadTester = async (req, res) => {
  //   const uploader = async (path) => await uploads.uploads(path, 'Images')
  //   console.log(uploader)
}
