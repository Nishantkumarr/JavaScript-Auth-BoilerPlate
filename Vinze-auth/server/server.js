const express = require('express')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cors=require('cors')
const connectDB = require('../server/config/dbConnect')

//Config the .env file to the webapp
require('dotenv').config({
    path:'./config/config.env'
})



//Connect to Database
connectDB()


const app=express()

//Config the bodyParser
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Config for only development
if(process.env.NODE_ENV==='development'){
    app.use(cors({
        origin:process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))

    //Morgan give information about each request
    //Cors its allow to deal with react for localhost at port 3000 without any problem

}



//Load the Routes
const authRouter=require('./routes/authentication')

//Using Routes
app.use('/api/',authRouter);


app.use((req,res,next) => {
    res.status(404).json({
        success:false,
        message:"Page Not Found"
    })
});



const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Say Hello To The Fucking World  ${PORT}`)
})