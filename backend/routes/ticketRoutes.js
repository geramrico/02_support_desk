const express = require('express')
const router = express.Router()
const { getTickets, getTicket, createTicket } = require('../controllers/ticketController')
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getTickets)       // all of user tickets
    .post(protect, createTicket)    // create a new ticket

router.route('/:id')
    .get(protect, getTicket)        //get one ticket by id

module.exports = router