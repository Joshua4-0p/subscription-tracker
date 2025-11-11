import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subcription Price is required'],
        min: [0, 'Price should be more than 0']
    },
    currency: {
        type: String,
        enum: ['XAF', 'USD', 'EUR', 'GBP'], //to specify the various possible currencies
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            //this validator is used to check the if the value that's been passed is correct
            validator: function (value) {
                return value <= new Date()
            },
            message: "Start date must be in past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Start date must be in past"
        }
    },
    //references pointing to other models in the database
    User: {
        types: mongoose.Schema.Types.ObjectId,
        ref: 'User', //this ref attribute points to other models in the database
        required: true,
        index: true, //which will optimize the query fill by indexing the user field
    },

}, { timestamps: true })

/*Here we will run a function(a call action) that will be executed before each document that's been 
    created will be stored in the Database, here it will to auto-calc the renewal date in case the user didn't fill it 
    */
//Auto-calculate the renewal Date if not Specified
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        //renewable set to be equal to startDate
        this.renewalDate = new Date(this.startDate) 
        //perform the calculation
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency])//the this.frequency(frequency is used here to refer to each element inthe obj)
    }

    //Auto-calculate is the renewal date has passed
    if (this.renewalDate < this.startDate) {
        this.status = 'expired'
    }
    
    next()
    })

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription