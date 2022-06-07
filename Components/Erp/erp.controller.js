import Erp from './erp.model.js'
import Drugs from '../Drugs/drugs.model.js'

export const assignErp = async (req, res) => {
  const { uid, entryDate, drugs } = req.body

  /**
   * check thru all the drugs in the database.
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
      return res.status(500).json({
        status: 500,
        message:
          "One or more of your items, don't have enough in the inventory to process this request",
      })
    } else {
      const newEntry = new Erp({ uid, entryDate, drugs })
      newEntry.save((er, result) => {
        /**
         * er here checks if the user exists in the db already!
         */
        if (er) {
          Erp.findOne({ uid }, (err, _res) => {
            let _drugs = _res.drugs

            // check that no existing drugs exists within the array.
            let x = _drugs.filter((_drug) =>
              drugs.find((drug) => {
                return drug.drug === _drug.drug
              }),
            )
            console.log('length : ', x.length)
            if (x.length > 0) {
              // update the uid's array.

              Erp.updateOne({ uid }, { $push: { drugs } }, (er, _data) => {
                console.log(`Error_`, er)
                console.log(`Data : `, _data)
                // reduce the inventory

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

                return res.status(200).json({
                  message: 'Update successful!',
                })
              })
            } else {
              return res.status(500).json({
                message:
                  'One or more of the drugs has already been assigned to the user!',
              })
            }
          })

          // return res.status(500).json({
          //   message: 'internal server error!',
          //   status: 500,
          // })
        } else {
          // console.log('something is happening') ...
          // update the inventory of the drugs from here as well ...
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
        }
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
