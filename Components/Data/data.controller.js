import WorkData from './data.model.js'

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
