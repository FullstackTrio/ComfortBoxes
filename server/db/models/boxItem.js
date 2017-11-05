const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');
const Promise = require('bluebird')

/*
BoxItem lists the items that have been ordered and
categorizes them by their respective boxes.

It is essentially an Order_Product join table with
additional information about the items in the order
*/

const BoxItem = db.define('boxItem', {
  boxId: {
    type: Sequelize.INTEGER
  },
  productPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0.00,
    get() {
      // this getter changes price value from cents in database to dollars and cents as returned value when 'getting' Product.price
      return this.getDataValue('productPrice') / 100;
    },
    set(cost) {
       // this setter changes price value from dollars and cents being passed in to cents in database when 'setting' Product.price
      this.setDataValue('productPrice', cost * 100);
    }
  },
  productQuantityInBox: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})
//BoxItem table has 2 foreign keys: order_id and product_id, but is not referenced in other tables

/**
 * classMethods
 */


/* When the same item is added to a box more than once,
these items will count as one instance of that BoxItem,
but productQuantityInBox and productPrice will both increase
(if added using BoxItem method below)
*/

// BoxItem.storeOrderedItems is called by Order.createOrder
// and returns order that items are associated with.
BoxItem.storeOrderedItems = function (arrayOfProductIds, order, boxId) {
  arrayOfProductIds.forEach((productId) => {
    const promiseArray = [
      BoxItem.create({
          order_id: order.id,
          boxId,
          product_id: productId
      }),
      Product.findById(productId)
    ]
    Promise.all(promiseArray)
      .spread((boxItem, product) => {
        boxItem.productQuantityInBox += 1;
        boxItem.productPrice += product.price;
        boxItem.save();
      })
  })
  return order;
}


module.exports = BoxItem;
