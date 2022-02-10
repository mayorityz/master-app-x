import express from 'express'
import {
  CreateAccount,
  fetchUsers,
  fetchUser,
  Login,
  UpdateAccount,
  deleteAccount,
} from './auth.controller.js'

const Router = express.Router()

Router.post('/newaccount', CreateAccount)
Router.post('/login', Login)
Router.get('/getAllUsers', fetchUsers)
Router.post('/getUser', fetchUser)
Router.post('/edit-account', UpdateAccount)
Router.post('/delete-account', deleteAccount)

export default Router
