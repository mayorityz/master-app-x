import WorkData from './data.model.js'
import chvaReqs from './chvareq.model.js'
import Users from '../Auth/auth.model.js'

export const EnterEntry = async (req, res) => {
  try {
    let { uid, assignment } = req.body
    let newEntry = new WorkData({ uid, assignment })
    newEntry.save((err, data) => {
      if (err) {
        console.log(err.message)
        return res
          .status(500)
          .json({ message: 'internal server error', status: 500 })
      }
      res
        .status(200)
        .json({ message: 'Work Data saved successfully!', status: 200 })
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const getDatabyChva = async (req, res) => {
  try {
    let { id, chvaid } = req.body
    WorkData.find({ uid: id }, (err, data) => {
      if (err) {
        console.log(err.message)
        return res
          .status(500)
          .json({ message: 'internal server error', status: 500 })
      }

      Users.findOne({ _id: chvaid }, (err, info) => {
        console.log(info)
        res.status(200).json({
          message: 'Work Data fetched successfully!',
          status: 200,
          data,
          info,
        })
      })
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const chvaRequest = async (req, res) => {
  const { to, from, uid, fullname, chvaid, requestBy } = req.body

  let newReq = new chvaReqs({ to, from, uid, fullname, chvaid, requestBy })
  newReq.save((err, res_) => {
    if (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: `Error Occured` })
    } else res.status(200).json({ status: 200, message: `Success` })
  })
}

export const myRequests = async (req, res) => {
  const { uid: requestBy } = req.body
  chvaReqs.find({ requestBy }, (err, data) => {
    console.log(data)
    if (err) {
      res.status(500).json({ status: 500, message: `Error Occured` })
    } else res.status(200).json({ status: 200, message: `Success`, data })
  })
}

export const PendingReqs = async (req, res) => {
  chvaReqs.find({ status: 'pending' }, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: `Error Occured` })
    } else res.status(200).json({ status: 200, message: `Success`, data })
  })
}

export const makeAsComplete = async (req, res) => {
  let { id } = req.body
  chvaReqs.updateOne({ _id: id }, { status: 'done' }, (err, result) => {
    if (result)
      res.status(200).json({ status: 200, message: 'updated successfully' })
    else res.status(500).json({ status: 500, message: 'Internal Server Error' })
  })
}
