const Sequelize = require('sequelize');
const connection = require('../db')

const conversions = connection.define('conversions', {
    userId: {
        type: Sequelize.STRING,
        
    },
    to: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    from: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quote: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }


})

conversions.sync({force: false})

module.exports = conversions