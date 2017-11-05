const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
//Category table has no foreign keys, but is referenced in Product_Category join table
module.exports = Category

