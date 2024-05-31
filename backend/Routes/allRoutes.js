import express from 'express'
import { signUp, login } from '../Controllers/allControllers.js'
const allRoutes = express()


allRoutes.post('/signup', signUp)
allRoutes.post('/login', login)


export default allRoutes