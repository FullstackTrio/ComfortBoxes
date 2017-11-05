const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// GET /api/orders/
router.get('/', (req, res, next) => {
  Order.findAll()
  .then(categories => {
    res.json(categories)
  })
  .catch((err) => console.error(err));
})

// POST /api/orders/
router.post('/', (req, res, next) => {
  const {orderObj, userId, shippingDetails} = req.body

  Order.createOrder(orderObj, userId, req.sessionID, shippingDetails);

  res.sendStatus(201);
})

