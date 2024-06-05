import express from 'express'
import { signUp, login, generateToken, getToken, apiService, deleteToken } from '../Controllers/allControllers.js'
import { authenticateToken } from '../Middlewares/authChecker.js'
const allRoutes = express()


allRoutes.post('/signup', signUp)
allRoutes.post('/login', login)
allRoutes.post('/api', apiService)
allRoutes.post('/token',authenticateToken, generateToken)
allRoutes.get('/user',authenticateToken, getToken)
allRoutes.delete('/delete/token',authenticateToken, deleteToken)


export default allRoutes