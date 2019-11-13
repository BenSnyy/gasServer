module.exports = function(req, res, next){
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-Within, Accept, Authorization' );

    next();
}