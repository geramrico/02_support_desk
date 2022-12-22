const asyncHandler = require('../utils/asyncHandler')
const Note = require('../models/noteModel')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//@desc     Get a ticket notes
//@route    GET /api/tickets/:ticketID/notes
//@access   Private
const getNotes = asyncHandler(async (req, res) => {
    const userId = req.user._id

    if (!userId) {
        res.status(401)
        throw new Error('Cant find user')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    // Check if ticket belongs to logged in user
    if (ticket.user.toString() !== userId.toString()) {
        res.status(401)
        throw new Error('User not authorized')
    }

    //get notes associated with the ticketId
    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})

//@desc     Create a ticket note
//@route    POST /api/tickets/:ticketID/notes
//@access   Private
const addNote = asyncHandler(async (req, res) => {

    const userId = req.user._id

    if (!userId) {
        res.status(401)
        throw new Error('Cant find user')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    // Check if ticket belongs to logged in user
    if (ticket.user.toString() !== userId.toString()) {
        res.status(401)
        throw new Error('User not authorized')
    }


    //Create note
    const note = await Note.create({
        text: req.body.text,
        ticket: req.params.ticketId,
        user: userId,
        isStaff: false
    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote
}