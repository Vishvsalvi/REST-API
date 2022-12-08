require('dotenv').config() // Load all the environment variables from .env

const express = require('express'); 
const app = express();

const mongoose = require('mongoose');
const subscriberRouter = require('./routes/subscribers') // Importing routes

mongoose.connect(process.env.DATABASE_URL, () => console.log("Connected"), (error) => console.log(error.message))
app.use(express.json())


app.use("/subscribers", subscriberRouter)


app.listen(3000, () => console.log('app running on port 3000') );
