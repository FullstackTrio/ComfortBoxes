const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      min: 5
    }
  }
})
//Review table has 2 foreign keys: user_id and product_id, and is not referenced in other tables
module.exports = Review

