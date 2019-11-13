var express = require('express');
var sequelize = require('../db')
var router = express.Router();
var Log = sequelize.import('../models/log')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// test point
router.get('/', function(req, res) {
    res.send("Basic Test Route for auth'd log endpoints")
});

router.post('/new', function(req, res) {
    let logDesc = req.body.log.description;
    let logRes = req.body.log.result;
    let logOwn = req.user.id;

    Log.create({
        description: logDesc,
        result: logRes,
        owner: logOwn,
    })
    .then(
        function createLogSuccess(Log) {  
            console.log("New Log Added")
            res.json({
                Log
            });
        },
        function createLogError(err) {
            console.log("New log not added")  
            res.send(500, err.message);
        }
    );
})

// get all logs by id
router.get('/all', function(req, res) {
    let logOwn = req.user.id;

    console.log(logOwn);
    Log.findAll({
        where: { owner: logOwn }  // find all where the owner is equal to the user id from the token
    })
    .then(
        function getAllSuccess(data) {  // assuming we are successful we will return all the data in a json
            res.json(data);
        },
        function getAllError(err) {
            res.send(500, err.message);  // if we don't pull it off we get an error message
            console.log("Error")
        }
    );
    console.log("Fetch Recieved. Reply sent.")
})

// update log by id //
// needs conditional for 'this is not your log' error
router.put('/update/:id', function(req, res) {
    var data = req.params.id;
    var newDesc = req.body.log.description
    var newRes = req.body.log.result;
    let logOwn = req.user.id;
    
    console.log(logOwn);

    Log.update({
        description: req.body.log.description,
        result: req.body.log.result
    },
    {where: { 
        id: req.params.id,
        owner: logOwn
    }
    }).then(
    function updateSuccess(Log) {
        res.json({
            newDesc, newRes
        });
    }, 
    function updateError(err) {
        res.send(500, err.message)
    }
)
})

// delete log by id
//   needs conditional statement for 'this is not your log' error
router.delete('/delete/:id', function(req, res) {
    var data = req.params.id;
    let logOwn = req.user.id;

    console.log("Param id: " + data);
    console.log("Owner id: " + logOwn);

    Log.destroy({
        where: { 
            id: data,
            owner: logOwn
        } 
    }).then(
        function deleteLogSuccess(data){
            res.send("Log deleted")
        },
        function deleteLogError(err){
            res.send(500, err.message, "You cannot delete this log");
        }
    );
    // future conditional ending
});

// get log by id for user
router.get('/:id', function(req, res) {
    let data = req.params.id;
    let logOwn = req.user.id;

    console.log(logOwn);
    Log.find({
        where: {
            id: data,
            owner: logOwn
            }  // find all where the owner is equal to the user id from the token
        }).then(
        function getAllSuccess(data) {  // assuming we are successful we will return all the data in a json
            res.json(data);
        },
        function getAllError(err) {
            res.send(500, err.message);  // if we don't pull it off we get an error message
        }
    );
})

module.exports = router;