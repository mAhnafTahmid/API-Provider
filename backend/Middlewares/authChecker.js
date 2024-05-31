import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authChecker = (req, res, next) => {
    const token = req.cookies.token
    const secretKey = process.env.secretKey

    if (!token) {
        return res.status(400).send({
            message: 'Access Denied!'
        })
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).send({
            message: 'Invalid Token!'
        })
    }
}