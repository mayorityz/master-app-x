import Model from './auth.model.js'

/**
 * 1. new account
 * 2. update account
 */

export const CreateAccount = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      level,
      location,
      ward,
      lga,
    } = req.body
    const ADD_USER = new Model({
      firstname,
      lastname,
      email,
      password,
      level,
      location,
      ward,
      lga,
    })
    await ADD_USER.save((err, result) => {
      console.log(err)
      if (err)
        res.status(500).json({ message: 'internal server error!', code: 500 })
      else
        res
          .status(200)
          .json({ message: 'Account Created Successfully', code: 200 })
    })
  } catch (error) {
    console.log(error)
  }
}

export const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    Model.find({ email, password }, { password: 0 }, (er, data) => {
      if (er) {
        return res
          .status(500)
          .json({ message: 'internal server error', status: 500 })
      }

      res.status(200).json({ message: 'Data Found!', status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const fetchUsers = async (req, res) => {
  try {
    Model.find({}, (er, data) => {
      if (er) {
        return res
          .status(500)
          .json({ message: 'internal server error', status: 500 })
      }

      res.status(200).json({ message: 'Data Found!', status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const fetchUser = async (req, res) => {
  try {
    const { id } = req.body
    Model.find({ _id: id }, { password: 0 }, (er, data) => {
      if (er) {
        return res
          .status(500)
          .json({ message: 'internal server error', status: 500 })
      }

      res.status(200).json({ message: 'Data Found!!!', status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const UpdateAccount = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    level,
    location,
    ward,
    lga,
    id,
  } = req.body

  try {
    Model.updateOne(
      { _id: id },
      { firstname, lastname, level, email, password, ward, location, lga },
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'internal server error', status: 500 })
        }

        res.status(200).json({ message: 'Profile Updated!', status: 200, data })
      },
    )
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}

export const deleteAccount = async (req, res) => {
  const { id } = req.body

  try {
    Model.deleteOne({ _id: id }, (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'internal server error', status: 500 })
      }

      res.status(200).json({ message: 'Profile Updated!', status: 200, data })
    })
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 })
  }
}
