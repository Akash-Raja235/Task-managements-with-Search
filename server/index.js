

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()

import connectDB from './database/db.js'
import userRouter from './routers/UserRouter.js'
import listRouter from './routers/listRouter.js'
app.use(cors())
app.use(express.json())

// routers


app.use("/api/v1", userRouter);
app.use("/api/v1/list", listRouter);


const port = process.env.PORT || 5000

const start = async()=>{

    try {
        
 // connect Databse
   await connectDB(process.env.MONGO_URL)

   app.listen(port, ()=>console.log(`server is running on port ${port}`))

    } catch (error) {
        console.log(error)
    }
}

start()