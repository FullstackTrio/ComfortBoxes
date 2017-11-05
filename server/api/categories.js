const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

// GET /api/categories/
// res.json array of category objects (that have arrays of product objects attached to each)
router.get('/', (req, res, next) => {
  Category.findAll({
    include: [{all: true}]
  }

    )
    .then(categories => {
      res.json(categories)
    })
    .catch((err) => console.error(err));
})


