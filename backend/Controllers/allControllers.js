import User from "../Models/userSchema.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()


export const signUp = async (req, res) => {
    try {
        if (
            req.body.username === '' || 
            !req.body.username || 
            req.body.email === '' || 
            !req.body.email || 
            req.body.password === '' || 
            !req.body.password
        ) {
            return res.status(400).send({
                message: 'Need to provide information in all the input field'
            })
        }
        const existingUser = await User.findOne({ email: req.body.email })

        if (existingUser) {
            return res.status(400).send({
                message: "User with this email address already exists!"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            tokens: []
        })

        res.status(200).send(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message
        })
    }
}

function generateJWT(user) {
    const secretKey = process.env.secretKey

    const payload = {
        id: user._id,
        email: user.email
    }

    const options = {
      expiresIn: '1h',
    };
  
    const token = jwt.sign(payload, secretKey, options);
    return token;
  }

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).send({
                message: 'User not found!'
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({
                message: 'Password Incorrect!'
            })
        }

        try {
            const token = generateJWT(user)
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'Lax', path: '/' })
            res.status(200).send({
                message: 'Login Successful!'
            })
        } catch (error) {
            console.log({
                message: 'Error creating JWT token!'
            })
        }

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

export const generateToken = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        const secretKey = process.env.secretKey;

        const decoded = jwt.verify(token, secretKey);

        const email = decoded.email
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).send('Invalid User!')
        }

        const timestamp = new Date().toISOString();

        const payload = {
            id: user._id,
            email: user.email,
            timestamp: timestamp
        }

        const options = {
        expiresIn: '1h',
        };
    
        const newToken = jwt.sign(payload, secretKey, options);
        user.tokens.push(newToken)
        await user.save()

        res.status(200).send(user.tokens)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: 'Internal Server Error!'
        })
    }
}