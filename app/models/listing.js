const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listingSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    bedrooms: {
        type: String,
        required: true
    },
    bathrooms: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }


})

// define listing model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Listing', listingSchema)
