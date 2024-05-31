import User from "../Models/userSchema.js"

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

        const user = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        res.status(200).send(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message
        })
    }
}
