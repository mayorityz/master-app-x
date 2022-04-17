import Requests from './request.model.js'
import Erp from './../Erp/erp.model.js'
import User from './../Auth/auth.model.js'

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
      { request: 1, createdAt: 1, item: 1, response: 1, status: 1 },
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
    Requests.aggregate(
      [
        { $match: { status: 'pending' } },
        { $group: { _id: '$uid', count: { $sum: 1 } } },
      ],
      (err, ress) => {
        if (err)
          return res
            .status(500)
            .json({ message: 'internal server error!', status: 500 })
        res.status(200).json({ status: 200, data: ress })
      },
    )
  } catch (error) {
    console.log(error.message)
  }
}

export const readRequest = async (req, res) => {
  try {
    let { uid } = req.body
    User.findOne({ _id: uid }, (err, success) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'internal server error!', code: 500 })
      } else {
        Requests.find(
          { uid: uid, status: 'pending' },
          { request: 1, createdAt: 1, item: 1, uid: 1 },
          (er, response) => {
            if (er)
              res
                .status(500)
                .json({ message: 'internal server error!', code: 500 })
            res
              .status(200)
              .json({ status: 200, data: response, userinfo: success })
          },
        )
      }
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const updateArequest = async (req, res) => {
  try {
    let { qty, comment, id, status, item, uid } = req.body
    console.log(req.body)

    if (qty === '') {
      return res
        .status(500)
        .json({ status: 200, message: 'quantity must be at least zero' })
    }

    if (status === 'rejected') {
      qty = 0
    }

    Requests.updateOne(
      { _id: id },
      { status, response: { qty, comment } },
      (err, response) => {
        if (err) {
        } else {
          Erp.updateOne(
            { uid, 'drugs.drug': item },
            {
              $set: { 'drugs.$.status': status },
              $inc: {
                'drugs.$.qty': parseFloat(qty),
              },
            },
            (errorr, resx) => {
              console.log('here')
              console.log(resx)
              console.log(errorr)
              res
                .status(200)
                .json({ status: 200, message: 'Update Successful' })
            },
          )
        }
      },
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'internal server error!', code: 500 })
  }
}

/**
 * {'$set': {"drugs.$.status" : status}
 */
