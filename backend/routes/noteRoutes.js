const express = require('express')
const router = express.Router({ mergeParams: true }) // to Re-route to api/tickets/ticketId/notes
const { getNotes, addNote } = require('../controllers/noteController')
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getNotes)
    .post(protect, addNote)

module.exports = router