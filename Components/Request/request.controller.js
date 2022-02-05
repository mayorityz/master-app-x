import Requests from './request.model.js'
import Erp from './../Erp/erp.model.js'

export const makeRequest = async (req, res) => {
  try {
    let { uid, request, status, drug } = req.body
    let newRequest = new Requests({ uid, request, status, item: drug })
    await newRequest.save(async (er, response) => {
      console.log(er)
      if (er)
        res.status(500).json({ message: 'internal server error!', code: 500 })
      else {
        Erp.updateOne(
          { uid: uid, 'drugs.drug': drug },
          { $set: { 'drugs.$.status': status } },
          { new: true },
          (error, _res) => {
            if (error) {
              console.log(error.message)
            } else {
              res.status(200).json({ status: 200, data: _res })
            }
          },
        )
      }
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const getMyRequest = async (req, res) => {
  try {
    let { uid } = req.body
    Requests.find(
      { uid: uid },
      { request: 1, createdAt: 1 },
      (er, response) => {
        if (er)
          res.status(500).json({ message: 'internal server error!', code: 500 })
        res.status(200).json({ status: 200, data: response })
      },
    )
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllRequests = async (req, res) => {
  try {
    Requests.find({ status: 'pending' }, (er, response) => {
      if (er)
        res.status(500).json({ message: 'internal server error!', code: 500 })
      res.status(200).json({ status: 200, data: response })
    })
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * {'$set': {"drugs.$.status" : status}
 */
