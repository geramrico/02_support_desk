const colors = require('colors')
const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000

const connectDB = require('./config/db')

const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()

//Connect to DB
connectDB()

// Body parser middleware to send raw json
app.use(express.json()) //JSON
app.use(express.urlencoded({extended:false})) //Form

// API Routes
//User Routes
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

// Ticket Routes
const ticketRoutes = require('./routes/ticketRoutes')
app.use('/api/tickets', ticketRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))