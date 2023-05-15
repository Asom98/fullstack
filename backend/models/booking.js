const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    service_id : {
        type: mongoose.Schema.Types.ObjectId,
    },
    employee_id : {
        type: mongoose.Schema.Types.ObjectId,
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    contact_email: {
        type: String,
    },
    status :{
        type: Boolean,
    },
    count: {
        type: Number
    }, 
    useCoupon: {
        type: Boolean
    },
    confirm: {
        type: Boolean
    }
})

module.exports = mongoose.model('Booking', bookingSchema)