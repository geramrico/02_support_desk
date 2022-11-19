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
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))