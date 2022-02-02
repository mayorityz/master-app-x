import express from 'express'
import { CreateAccount, fetchUsers, fetchUser } from './auth.controller.js'

const Router = express.Router()

Router.post('/newaccount', CreateAccount)
Router.get('/getAllUsers', fetchUsers)
Router.post('/getUser', fetchUser)

export default Router
