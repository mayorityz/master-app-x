import Learning from './learning.model.js'
import Activity from './Activities.model.js'
import fs from 'fs'
import CommentModel from './PostComments.model.js'
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

export const findResourceById = async (req, res) => {
  try {
    let { id } = req.body
    Learning.findOne({ _id: id }, (er, data) => {
      if (er) {
        return res.status(500).json({ message: er.message, statu: 500 })
      }
      res.status(200).json({ message: 'success', status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const createNewActivity = async (req, res) => {
  try {
    console.log('here')
    console.log(req.body)
    let { id, action } = req.body
    let freshActivities = new Activity({ uid: id, action })
    freshActivities.save((errr, ress) => {
      console.log(errr)
      console.log(ress)
    })
    res.status(200)
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const getActivities = async (req, res) => {
  try {
    let { id } = req.body

    Activity.find({ uid: id }, (err, response) => {
      if (err) {
        res.status(500).json({ message: error.message, status: 500 })
      } else
        res
          .status(200)
          .json({ status: 200, message: 'success', data: response })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const postComment = async (req, res) => {
  try {
    let { uid, comment, postid } = req.body
    console.log(req.body)
    let newComment = new CommentModel({ uid, comment, postid })
    newComment.save()
    res.status(200).json({ message: 'success', status: 200 })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const fetchComments = async (req, res) => {
  try {
    let { uid, postid } = req.body
    CommentModel.find({ uid, postid }, (err, response) => {
      if (err) {
        res.status(500).json({ message: err.message, status: 500 })
      } else {
        res
          .status(200)
          .json({ status: 200, message: 'success', data: response })
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}
