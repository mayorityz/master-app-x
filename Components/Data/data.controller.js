import WorkData from './data.model.js'
import chvaReqs from './chvareq.model.js'

export const EnterEntry = async (req, res) => {
  try {
    let { description, uid, quantity } = req.body
    let newEntry = new WorkData({ description, uid, quantity })
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
    let { id } = req.body
    WorkData.find({ uid: id }, (err, data) => {
      if (err) {
        console.log(err.message)
        return res
          .status(500)
          .json({ message: 'internal server error', status: 500 })
      }

      res
        .status(200)
        .json({ message: 'Work Data fetched successfully!', status: 200, data })
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const chvaRequest = async (req, res) => {
  const { to, from, uid, fullname } = req.body
  console.log(req.body)

  let newReq = new chvaReqs({ to, from, uid, fullname })
  newReq.save((err, res_) => {
    if (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: `Error Occured` })
    } else res.status(200).json({ status: 200, message: `Success` })
  })
}

export const myRequests = async (req, res) => {
  const { uid } = req.body
  chvaReqs.find({ uid }, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: `Error Occured` })
    } else res.status(200).json({ status: 200, message: `Success`, data })
  })
}

export const PendingReqs = async (req, res) => {
  chvaReqs.find({}, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: `Error Occured` })
    } else res.status(200).json({ status: 200, message: `Success`, data })
  })
}
