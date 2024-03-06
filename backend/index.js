// Importing the route handlers
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
app.use(cors());
// Connect to MongoDB
connectToMongo();
// Route Handlers

//User Routes

const UserOperation = require('./routes/UserOperation');


app.use('/', UserOperation)


// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
// module.exports = app