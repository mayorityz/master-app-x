import DrugsModel from './drugs.model.js'

export const createDrug = (req, res) => {
  try {
    const { name, quantity } = req.body
    let newDrug = new DrugsModel({ name, quantity })
    newDrug.save((err, data) => {
      if (err) {
        return res.status(500).json({
          message: `Internal Server Error : ${err.message}`,
          status: 500,
        })
      }
      res
        .status(200)
        .json({ message: `Drug Created Successfully!`, status: 200 })
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 500 })
  }
}

export const getAllDrugs = (req, res) => {
  try {
    DrugsModel.find({}, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: `Internal Server Error : ${err.message}`,
          status: 500,
        })
      }
      res
        .status(200)
        .json({ message: `Query Successfully!!!`, status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 500 })
  }
}

export const editDrugs = (req, res) => {
  try {
    const { id, quantity, name } = req.body
    DrugsModel.updateOne({ _id: id }, { quantity, name }, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: `Internal Server Error : ${err.message}`,
          status: 500,
        })
      }
      res
        .status(200)
        .json({ message: `Record Updated Successfully!!!`, status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 500 })
  }
}
