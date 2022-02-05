import Erp from './erp.model.js'

export const assignErp = async (req, res) => {
  const { uid, entryDate, drugs } = req.body

  try {
    const newEntry = new Erp({ uid, entryDate, drugs })
    newEntry.save((er, result) => {
      if (er) {
        console.log(er)
        return res.status(500).json({
          message: 'internal server error',
          status: 500,
        })
      }
      //   update the inventory of the drugs from here as well
      res.status(200).json({
        message: 'Saved Successfully!',
        status: 200,
      })
    })
  } catch (error) {
    res.status(500).json({
      message: `internal server error : ${error.message}`,
      status: 500,
    })
  }
}

export const getDrugsAssignedToChva = async (req, res) => {
  try {
    let { id } = req.body
    let find = Erp.findOne({ uid: id }, (er, result) => {
      if (er) {
        return res.status(500).json({
          message: 'internal server error',
          status: 500,
        })
      }
      res.status(200).json({
        message: 'Success',
        status: 200,
        data: result,
      })
    })
  } catch (error) {
    res.status(500).json({
      message: `internal server error : ${error.message}`,
      status: 500,
    })
  }
}
