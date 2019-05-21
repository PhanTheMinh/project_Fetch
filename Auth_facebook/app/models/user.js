var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var sequelize = new Sequelize('postgres://postgres:23041997@localhost:5432/TimoApp', {
    logging: console.log
});
//var Model = sequelize.Model;
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

var User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    token: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    }
});

User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('You enter wrong database credentials'));
    
module.exports = User;