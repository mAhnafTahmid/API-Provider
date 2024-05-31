import express from 'express'
import { signUp } from '../Controllers/allControllers.js'
const allRoutes = express()


allRoutes.post('/signup', signUp)


export default allRoutes