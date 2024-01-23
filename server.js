const express = require('express');  // We import the express application
require("dotenv").config();
const cors = require('cors'); // Necessary for localhost
const { Console, error } = require('console');
const middleware = require('./utils/middleware');
const cursRouter =require('./routers/currencies');
const countryRouter = require('./routers/countries');
const sequelize = require("./config/sequelize");



const app = express() // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())

 // Added morgan middleware to log requests
app.use(middleware.logger);

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.use('', cursRouter);

app.use('/api/count',countryRouter);

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.use('/api/currency',cursRouter);

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.use('/api/currency/:id', cursRouter);

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.use('/api/currency/', cursRouter)

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
app.use('/api/currency/:id/:newRate', cursRouter);

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
app.use('/api/currency/:id', cursRouter);

// Added middleware for unknown endpoint
app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT;

sequelize.sync().then(() =>{
  console.log("DataBase synced successfully");
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});
}).catch((error) =>{
  console.error("error in syncing the database: ",error);
})
