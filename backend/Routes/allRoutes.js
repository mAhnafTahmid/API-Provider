import express from 'express'
import { signUp, login, generateToken } from '../Controllers/allControllers.js'
import { authenticateToken } from '../Middlewares/authChecker.js'
const allRoutes = express()


allRoutes.post('/signup', signUp)
allRoutes.post('/login', login)
allRoutes.post('/token',authenticateToken, generateToken)


export default allRoutes