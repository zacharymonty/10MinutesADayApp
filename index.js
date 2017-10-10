const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.use(require('./app/routes/routes'));
app.use('/public', express.static(path.join(__dirname, 'public'), {
    fallthrough: false
}));

// set our port
const port = process.env.PORT || 8080

// mpromise is depreciated, use native es6 Promise
mongoose.Promise = global.Promise

// connect to mongoDB database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017')

// If the Node process ends, close the Mongoose connection
// see: http://theholmesoffice.com/mongoose-connection-best-practice/
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})

app.listen(8080, () => {
    console.log(`the party has started at ${port}`);
});