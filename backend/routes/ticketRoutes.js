const express = require('express')
const router = express.Router()
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getTickets)       // all of user tickets
    .post(protect, createTicket)    // create a new ticket

router.route('/:id')
    .get(protect, getTicket)        //get one ticket by id
    .delete(protect, deleteTicket)        //delete  ticket by id
    .put(protect, updateTicket)        //delete  ticket by id

module.exports = router