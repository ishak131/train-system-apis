const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../schemas/user');
const { authinticate } = require('./auth');
const userRouter = express.Router();

////////////////////////  create user account //////////////////////////////

userRouter.post('/createUser', async (req, res) => {
    try {
        const isFoundUser = await User.findOne({
            email: req.body.email,
            identityNumber: req.body.identityNumber
        });
        if (isFoundUser)
            return res.status(409).send({ error: 'This user already exists' });
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt);
        req.body.password = newPassword
        const user = await new User(req.body)
        await user.save()
        const token = jwt.sign(
            { email, _id: user._id },
            process.env.TOKEN_PRIVATE_KEY,
            { expiresIn: '30d' });
        return res.json({ token })
    } catch (err) {
        return res.status(400).send({ error: err })
    }
})

//////////////////////// Log in  //////////////////////////////

userRouter.get('/logIn/:email/:password', async (req, res) => {
    try {
        const { password, email } = req.params
        const loggedInUser = await User.findOne({ email });
        if (!loggedInUser)
            return res.status(401).send({ error: 'email or password is wrong' });
        const passwordFromDB = loggedInUser.password;
        const passwordIsCorrect = await bcrypt.compare(password, passwordFromDB);
        if (passwordIsCorrect) {
            const token = jwt.sign(
                { email, _id: loggedInUser._id },
                process.env.TOKEN_PRIVATE_KEY,
                { expiresIn: '30d' })
            return res.json({ token })
        }
        return res.status(401).send({ error: 'email or password is wrong' });
    } catch (error) {
        res.status(400).send({ error })
    }
})


userRouter.get('/getUser', authinticate, async (req, res) => {
    try {
        const { _id } = req.user
        const user = await User.findById(_id)
        if (user)
            return res.send(user)
    } catch (err) {
        res.send(404)
    }
})



module.exports = userRouter