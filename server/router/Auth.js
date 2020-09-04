const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator').default
const { mongoClient } = require('../dataSources/DataSources')

authRouter.post('/signup', async (req, res) => {
    const { userName, password, email } = req.body

    if (!validator.isEmail(email)) {
        res.status(400).send('The email address was invalid please try again')
    } else {
        const isUserNameTaken = await mongoClient.getUserByName(userName)
        if (isUserNameTaken) {
            res.status(409).send('The user name is already taken')
        } else {
            const newUser = await mongoClient
                .addUser({
                    userName,
                    password: await bcrypt.hash(password, 10),
                    email,
                    favorites: [],
                    subscribed: false,
                    notifications: []
                })

            newUser
                .save()
                .then(user => { res.status(201).send({ userId: user._id, msg: 'success' }) })
                .catch(error => { res.status(500).send('Oops the user couldn\'t be saved please try again') })
        }
    }
})

authRouter.post('/login', async (req, res) => {
    const { userName, password } = req.body
    const isUserNameInDB = await mongoClient.getUserByName(userName)
    if (!isUserNameInDB) {
        res.status(401).send('User name not in data base')
    } else {
        const hash = isUserNameInDB.password
        await bcrypt.compare(password, hash) ?
            res.status(202).send({ userId: isUserNameInDB._id, msg: 'user found in database' })
            :
            res.status(401).send('passwords dont match')
    }
})

module.exports = authRouter