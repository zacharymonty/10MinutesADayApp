const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    entry: {
        type: String,
        required: true
    }
})

// define our journal model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Journal', journalSchema)
