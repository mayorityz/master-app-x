import express from 'express'
import {
  CreateAccount,
  fetchUsers,
  fetchUser,
  Login,
} from './auth.controller.js'

const Router = express.Router()

Router.post('/newaccount', CreateAccount)
Router.post('/login', Login)
Router.get('/getAllUsers', fetchUsers)
Router.post('/getUser', fetchUser)

export default Router
