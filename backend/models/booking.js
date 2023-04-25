const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    service_id : {
        type: String,
    },
    employee_id : {
        type: String,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    user_id : {
        type: String,
    },
    contact_email: {
        type: String,
    },
    status :{
        type: Boolean,
    },
})

module.exports = mongoose.model('Booking', bookingSchema)