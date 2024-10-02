require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const PORT = process.env.PORT;
const jwt = require('jsonwebtoken')

const connectDB = require('./database/connect')
const MONGO_URI = process.env.MONGO_URI

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const authRouter = require('./routes/auth')
const expenseRouter = require('./routes/expense')
const authMiddleware = require('./middleware/auth')

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found')

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set('trust proxy' , 1)
app.use(rateLimiter({
    windowMs : 15 * 60 * 1000 ,
    max : 100,
    message : 'you have sent too many requests ejor take a chill pill :)'
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/expenses' ,authMiddleware, expenseRouter)


app.use(errorHandlerMiddleware);
app.use(notFound)
const start = async ()=>{
    try {
        await connectDB(MONGO_URI)
        app.listen(PORT , console.log(`server is running on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()