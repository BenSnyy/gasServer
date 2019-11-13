const Sequelize = require('sequelize');

const sequelize = new Sequelize('gasgazelle', 'postgres', 'postGree3', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to GasGazelle postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;