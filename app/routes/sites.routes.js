const router = require('express').Router()
const sitesController = require('../controllers/sites.controller')

// frontend routes =========================================================
// route to handle all angular requests
router.get('*', sitesController.default)

module.exports = router
