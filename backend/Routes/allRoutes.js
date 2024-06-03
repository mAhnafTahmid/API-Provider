import express from 'express'
import { signUp, login, generateToken } from '../Controllers/allControllers.js'
const allRoutes = express()


allRoutes.post('/signup', signUp)
allRoutes.post('/login', login)
allRoutes.post('/token', generateToken)


export default allRoutes