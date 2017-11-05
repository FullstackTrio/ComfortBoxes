const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      // this getter changes price value from cents in database to dollars and cents as returned value when 'getting' Product.price
      return this.getDataValue('price') / 100;
    },
    set(cost) {
       // this setter changes price value from dollars and cents being passed in to cents in database when 'setting' Product.price
      this.setDataValue('price', cost * 100);
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.thecellartrust.org/wp-content/uploads/2016/04/Product-Image-Coming-Soon.png',
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
}

)
//Product table has no foreign keys, but can be referenced in Product_Category, Review, and BoxItem tables
module.exports = Product
