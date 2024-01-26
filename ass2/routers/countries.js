const countryRouter = require('express').Router()
const Country = require("../models/country");

//test get for country table
countryRouter.get('/about', (request, response) => {
    console.log("country get");
    response.send('Welcome to country Table');
  })

//retrieve all records from country table
countryRouter.get('/', (request, response) => {
    try{
      Country.findAll().then(countries =>{
        response.status(200).send(countries);
      })
    }
    catch (error){
      console.log("error retreving countries");
    }
    })

//retrive specific record
countryRouter.get('/:id', async(request, response) => {
  try{
    const specificID = request.params.id;
    const specificCounty = await Country.findByPk(specificID);
    
    if(specificCounty){
      response.json(specificCounty);
    }
    else{
      response.status(404).json({ error: 'resource not found' });
    }
  }
  catch (error){
    console.log("error get specific county from it's ID");
  }
  })

//Post a new country

countryRouter.post('/', async (request, response) =>
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

//delete one country
countryRouter.delete('/:id', async(request, response) => {
  try{
    const specificID = request.params.id;
    // used find because i want to check if that currency existed or not
    const deletedCountry = await Country.findByPk(specificID);

    await Country.destroy({
      where:{
        id:specificID
      }
    }).then(deleted =>
      {
        if(deleted === 1){
          console.log("deleted country with id - ",specificID);
          response.json({deletingRecord :deletedCountry});
        }
        else{
          // console.log('No currency record found with the specified ID.');
          response.status(404).json({ error: 'No country record found with the specified ID.' });
        }

      })
    }catch (error) {
    console.error("Error deleting country:", error);
    response.sendStatus(500);}
  
  })



module.exports = countryRouter;