var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');

/* Controller Method #1: Simple Response */
router.post('/one', function(req, res) {
    res.send("Test 1 went through!")
});

/* Controller Method #2: Persisting Data */
router.post('/two', function (req, res) {
    let testData = "test data for endpoint two";

    TestModel
    .create({
        testdata: testData
    }) .then(dataFromDatabase => {
        res.send("Test Two went through!")
    })
});

/* Controller Method #3: req.body */
router.post('/three', function (req, res) {
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

router.post('/four', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    }) .then(
        function message() {
            res.send("Test 4 went through!");
        }
    );
});

/* Route 5: Return data in a Promise */
router.post('/five', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    }) .then(
        function message(data) {
            res.send(data);
        }
    );
});

/* Route 6: Return response as JSON */
router.post('/six', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    }) .then(
        function message(testdata) {
            res.json({
                testdata: testdata
            });
        }
    );
});

/* Route 7: Handle errors */
router.post('/seven', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    }) .then(
        function message(testdata) {
            res.json({
            testdata: testdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/', function (req, res) {
    res.send('Hey! This is a test route');
});

router.get('/about', function (req, res) {
    res.send('This is an about route');
});

//1 Pass in an Object
router.get('/contact', function (req, res) {
    res.send({user: "kenn", email: "kenn@beastmode.com"});
});

//2 Pass in an array
router.get('/projects', function (req, res) {
    res.send(['Project 1', 'Project 2']);
});

//3 Pass in an array of objects
router.get('/mycontacts', function (req, res) {
    res.send([
        {user: "quincy", email: "kenn@beastmode.com"},
        {user: "aaron", email: "aaron@beastmode.com"},
        {user: "quincy", email: "quincy@beastmode.com"},
        {user: "tom", email: "tom@beastmode.com"}
    ]);
});

module.exports = router;