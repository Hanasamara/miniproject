const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const { Console } = require('console')
const middleware = require('./utils/middleware')
const cursRouter =require('./routers/currencies')

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


/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.use('/',cursRouter);

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */


/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */


/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */


/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */


// Added middleware for unknown endpoint
app.use(middleware.unknownEndpoint);

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})