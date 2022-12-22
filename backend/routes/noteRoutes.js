const express = require('express')
const router = express.Router({ mergeParams: true }) // to Re-route to api/tickets/ticketId/notes
const { getNotes } = require('../controllers/noteController')
const protect = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes)

module.exports = router