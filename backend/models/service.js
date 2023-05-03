const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
    img : {
        type: String,
    },
    name : {
        type: String,
    },
    description : {
        type: String,
    },
    price : {
        type: String,
    },
    duration: {
        type: String,
    },
    business_hours: {
        type: Object,
    },
    employee_ids: {
        type: [mongoose.Schema.Types.ObjectId],
    },
})

module.exports = mongoose.model('Service', serviceSchema)

