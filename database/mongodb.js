import moongose from "mongoose"
import { MONGO_URI, NODE_ENV } from '../config/env.js' 

//check if the MONGO_URI exists
if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables")
}

//then create the connection to the database function

const connectDB = async () => {
    try {
        await moongose.connect(MONGO_URI)
        console.log(`MongoDB connected to the ${NODE_ENV} mode succesfully`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
        process.exit(1) //exit the process with failure
    }
}

export default connectDB;