const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // only send these attributes
    attributes: ['id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.json(user))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    return user.update({
        isAdmin: !user.isAdmin
      }, {
        fields: ['isAdmin']
      }
    )
  })
	.then( res.json.bind(res) )
	.catch(next);
})

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: { id: req.params.id }
  })
  .then(res.json.bind(res))
  .catch(next);
})
