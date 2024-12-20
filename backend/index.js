import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js'
import booksRoute from './routes/bookRoutes.js'
import cors from 'cors'

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS POLICY
// * Option 1: Allow All Origins With Default of cors (Cross-Origin Resourse Sharing)
app.use(cors())

// * Option 2: Allow Custom Origins
/*
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)
*/

app.get('/', (req, res) =>{
    console.log(req)
    return res.status(234).send('Welcome To Mern Stact Tutorial')
})

app.use('/books', booksRoute)

const mongoDBURL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@book-store-mern.omo83.mongodb.net/?retryWrites=true&w=majority&appName=Book-store-MERN`

mongoose.connect(mongoDBURL).then(()=>{
    console.log('App connected to database')
    
    app.listen(PORT, () =>{
        console.log(`App is listening to port: ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})