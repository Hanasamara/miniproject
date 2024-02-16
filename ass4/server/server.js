const express = require('express');  // We import the express application
require("dotenv").config();
const cors = require('cors'); // Necessary for localhost
const { Console, error } = require('console');
const middleware = require('./utils/middleware');
const cursRouter =require('./routers/currencies');
const countryRouter = require('./routers/countries');
const currCountry= require('./routers/curr_country');
const sequelize = require("./config/sequelize");


console.log(`We are working on ${process.env.NODE_ENV}`);


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


app.use('/api/country',countryRouter);

app.use('/api/currency',cursRouter);

app.use('/api/currency-country',currCountry);


app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});

module.exports = server
// sequelize.sync().then(() =>{
//   console.log("DataBase synced successfully");
// a
// }).catch((error) =>{
//   console.error("error in syncing the database: ",error);
// })

// sequelize.sync()
//     .then(() => {
//         console.log('Database synced');
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     })
//     .catch(error => {
//         console.error('Database sync error:', error);
//     });
