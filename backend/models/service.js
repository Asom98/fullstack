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
    employee_ids: {
        type: [String],
    },
})

module.exports = mongoose.model('Service', serviceSchema)
