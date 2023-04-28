const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
    img : {
        type: String,
    },
    name : {
        type: String,
    },
    duration: {
        type: Number,
    },
    business_hours: {
        open: { 
            type: Date
        },
        close: { 
            type: Date
        }
    },
    description : {
        type: String,
    },
    price : {
        type: String,
    },
    employee_ids: {
        type: [mongoose.Schema.Types.ObjectId],
    },
})

module.exports = mongoose.model('Services', serviceSchema)

