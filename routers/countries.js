const countryRouter = require('express').Router()
const Country = require("../models/country");

//test get for country table
countryRouter.get('/api/count/', (request, response) => {
    console.log("country get");
    response.send('Welcome to country Table');
  })

//retrieve all records from country table
countryRouter.get('/api/country/', (request, response) => {
    try{
      Country.findAll().then(countries =>{
        response.status(200).send(countries);
      })
    }
    catch (error){
      console.log("error retreving countries");
    }
    })


countryRouter.post('/api/country/', async (request, response) =>
{
    try{
        await Country.create({
            id: request.body.id,
            name: request.body.name
          }).then(newCountry=>{
            response.json(newCountry);
          })
    }
    catch (error){
        console.log("error adding row to country table ");
    }

})

module.exports = countryRouter;