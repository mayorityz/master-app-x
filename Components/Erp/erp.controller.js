import Erp from './erp.model.js'
import Drugs from '../Drugs/drugs.model.js'

export const assignErp = async (req, res) => {
  const { uid, entryDate, drugs } = req.body
  console.log(`Assignment : `, drugs)

  /**
   * - Check that its not less than the amount being assigned !!!
   * - Reduce the qty !!!
   *
   * -- solution
   * -- select all from drugs, compare amounts, if any is less than the request, decline the request.
   * 
   * {
  _id: new ObjectId("621f9f86c415f55a1484781e"),
  name: 'chloroquine',
  quantity: 100,
  createdAt: 2022-03-02T16:47:02.981Z,
  updatedAt: 2022-03-02T16:47:02.981Z,
  __v: 0
}
   */

  Drugs.find({}, (er, drugz) => {
    let map = drugs.map((x) => {
      let y = drugz.find((d) => {
        return parseInt(x.qty) <= d.quantity && x.drug === d.name
      })
      return y
    })
    let include = map.includes(undefined)
    if (include) {
      res.status(500).json({
        status: 500,
        message:
          "One or more of your items, don't have enough in the inventory to process this request",
      })
    } else {
      const newEntry = new Erp({ uid, entryDate, drugs })
      newEntry.save((er, result) => {
        console.log(er)
        if (er) {
          return res.status(500).json({
            message: 'internal server error',
            status: 500,
          })
        }
        //   update the inventory of the drugs from here as well
        for (let i = 0; i < drugs.length; i++) {
          const element = drugs[i]

          Drugs.updateOne(
            { name: element.drug },
            { $inc: { quantity: -element.qty } },
            (err, response) => {
              console.log('response')
            },
          )
        }

        res.status(200).json({
          message: 'Saved Successfully!',
          status: 200,
        })
      })
    }
  })

  // try {
  //   const newEntry = new Erp({ uid, entryDate, drugs })
  //   newEntry.save((er, result) => {
  //     if (er) {
  //       console.log(er)
  //       return res.status(500).json({
  //         message: 'internal server error',
  //         status: 500,
  //       })
  //     }
  //     //   update the inventory of the drugs from here as well
  //     res.status(200).json({
  //       message: 'Saved Successfully!',
  //       status: 200,
  //     })
  //   })
  // } catch (error) {
  //   res.status(500).json({
  //     message: `internal server error : ${error.message}`,
  //     status: 500,
  //   })
  // }
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
