// basic server creation

const express  = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./coonfig/dbConnection');
const dotenv  = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Middleware to parse JSON request body
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(` Server is current runing on port number ${port}`);
})