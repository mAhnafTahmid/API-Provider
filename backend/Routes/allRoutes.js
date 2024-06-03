import express from 'express'
import { signUp, login, generateToken, getToken } from '../Controllers/allControllers.js'
import { authenticateToken } from '../Middlewares/authChecker.js'
const allRoutes = express()


allRoutes.post('/signup', signUp)
allRoutes.post('/login', login)
allRoutes.post('/token',authenticateToken, generateToken)
allRoutes.get('/user',authenticateToken, getToken)


export default allRoutes