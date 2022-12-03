const Ticket = require('../models/ticketModel')
const User = require('../models/ticketModel')
const asyncHandler = require('../utils/asyncHandler')
const ExpressError = require('../utils/ExpressError')




//@desc     Get user tickets
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res) => {
    const userId = req.user._id

    if (!userId) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({ user: userId })

    res.status(200).json(tickets)

})


//@desc     Get user ticket
//@route    GET /api/tickets/:id
//@access   Private
const getTicket = asyncHandler(async (req, res) => {

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    // Check if ticket belongs to the logged in user
    if (ticket.user.toString() !== req.user.id) {
        res.status(403)
        throw new Error('Not allowed')
    }


    res.status(200).json(ticket)

})

//@desc     Create new ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res) => {
    // Get from req body
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Missing product name and/or description')
    }

    // Get ID from JWT (authMiddleware)
    const userId = req.user._id

    if (!userId) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        user: userId,
        product,
        description,
        status: 'new'
    })

    res.status(201).json(ticket)

})






module.exports = {
    getTickets,
    getTicket,
    createTicket
}