const Sequelize = require('sequelize')
const db = require('../db')

//placeholder or example of a model

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = User


