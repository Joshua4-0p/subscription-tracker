//this errorMiddleware is to ease debugging in case an error occurs
//it will help us easily identify the issues in the code or from coming from the database
const errorMiddleware = (err, req, res, next) => {
    try {
        //first define the error parameter
        let error = { ...err }

        error.message = err.message;

        console.error(err)

        //now we're to define the different types of errors which can happen
        //and the errors define here are the different types of errors that frequently occur
        //mongoose bad ObjectId(such error happens when the model you refer to doesn't exist)
        if(err.name === 'CastError') {
            const message = "Resource not found"
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if (err.code === 11000) {
            const message = "Duplicate field value entered"
            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if (err.name === 'ValidationError') {
            //we'll form the message by mapping over the values of the object 
            //because we might have many validation errors and we show a message for each one
            const message = Object.values(err.errors).map(val => val.message);//val here stands like the index that going through each value
            //now we'll joint the error message for each validation using gommas and spaces

            error = new Error(message.join(', '));//this line is to joint all the error message gotten from each value above using gommas
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({sucess: "false", message: error.message || 'Server Error'})
    } catch (error) {
        next(error)
    }
}

export default errorMiddleware