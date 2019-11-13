// var express = require('express')
// var router = express.Router()
// var sequelize = require('../db');
// var User = sequelize.import('../models/user');
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');

// /* Create User Endpoint */
// router.post('/createuser', function (req, res) {
//     var email = req.body.user.email;
//     var username = req.body.user.username;
//     var pass = req.body.user.password;

//     User.create({
//         email: email,
//         username: username,
//         passwordhash: bcrypt.hashSync(pass, 10)
//     }) .then(
//         function createSuccess(user) {
//             var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

//             res.json({
//                 user: user,
//                 message: 'created',
//                 sessionToken: token
//             });
//         },
//         function createError(err) {
//             res.send(500, err.message);
//         }
//     );
// });

// /* Signin to User */
// router.post('/login', function(req, res) {
//     User.findOne({ where: { username: req.body.user.username } }).then(
//         function(user){
//             if (user) {
//                 bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
//                     if (matches) {
//                         var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
//                         res.json({
//                             user: user,
//                             message: "successfully authenticated",
//                             sessionToken: token
//                         });
//                     } else {
//                         res.status(502).send({ error: "you failed, yo"});
//                     }
//                 });
//             } else {
//                 res.status(500).send({ error: "failed to authenticate" });
//             }
//         },
//         function(err) {
//             res.status(501).send({ error: "you failed" })
//         }
//     );
// });

const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//SIGNUP
router.post('/createuser', (req, res) => {
    User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = err => res.send(err)
    )
    .catch(err => res.send(500, err))
})

//SIGNIN
router.post('/login', (req, res) => {
    User.findOne({ where: {email: req.body.user.email } })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message: 'succesfully authenticated server',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: 'bad gateway, passwords don\'t match'})
                }
            })
        } else {
            res.status(500).send({ error: 'failed to authenticated, no user found'})
        }
    }, err => res.status(501).send({ error: 'failed to process'})
    )
})

/* Find All Users */
router.get('/users', function(req, res) {

    User
    .findAll()
    .then(
        function usersSuccess(data){
            res.json(data)
        },
        function usersError(err){
            res.send(500, err.message)
        }
    );
});

module.exports = router;