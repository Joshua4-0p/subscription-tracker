import express from 'express'
//const express = require('express') //express module
import { PORT } from './config/env.js'; // Importing PORT from the env.js file
import subscriptionRouter from "./routes/subscription.router.js";
import authRouter from "./routes/auth.router.js";
import userRouter from './routes/user.router.js';
import courseRouter from "./routes/course.router.js";
import connectDB from './database/mongodb.js';


const app = express(); //app is an instance of express

/*There is the app.use(), the use is either the specify the middleware of the route
 or to specify where to get to that route or the api that when called or access calls
 the route
*/
app.use(express.json())
app.use('/api/v1/auth', authRouter); //so one of the api can be api/v1/auth/signin and when you call this api it use the signin route in the authRouter
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/courses', courseRouter);


app.get('/', (req, res) => {
  //the callback function that will be called when you have an http get request from the '/' endpoint
  res.send("Welcome to the Subcription Tracker API!"); //function handler
})
/*the / is to say that we're to access the root route the application's homepage(infact it is a path on the server)
the (req, res) which is the handler(the function that is executed when the route is matched) 
stands for request and response, anytime we're creating a route we'll need to specify it
- the route above respond with a welcome on the homepage
*/

app.listen(PORT, async() => { //now listen on 'PORT' which can be any number
  console.log(`Subcription Tracker API is running http://localhost:${PORT}`) //use `` when you want to define a template string in the application
  await connectDB(); //don't forget to precise that it is asynchronous function
});

export default app;