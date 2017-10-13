const router = require('express').Router()
const listingsController = require('../controllers/listings.controller')()

module.exports = router

// api routes ===========================================================
router.get('/', listingsController.getAll)
router.get('/:id', listingsController.getOneById)
router.post('/', listingsController.insert)
router.put('/:id', listingsController.updateById)
router.delete('/:id', listingsController.removeById)
