const jwt = require('jsonwebtoken');
const express = require('express')
const authRouter = express.Router();

async function authinticate(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split('=')[1]
        if (!token)
            return res.send(401)
        jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async (err, user) => {
            if (err)
                return res.status(400).send({ err });
            req.user = user
            next()
        })
    } catch (error) {
        res.status(400).send({ error })
    }
}

authRouter.post('/auth', authinticate)

module.exports = { authinticate, authRouter }