const cursRouter = require('express').Router()
// const Currency = require("../models/currency");
const express = require('express');

// import both test and dev currency

const Currency = process.env.NODE_ENV === "test" ? require("../models/testCurrency"):require("../models/currency");

//Check router
cursRouter.get('/about', (request, response) => {
    response.send('Welcome to Currency table')
  })

//retrieve all rows
cursRouter.get('/', (request, response) => {
  try{
    Currency.findAll().then(currencies =>{
      response.status(200).send(currencies);
    })
  }
  catch (error){
    console.log("error retreving currencies");
  }
  })

//retrive spesific row
cursRouter.get('/:id', async(request, response) => {
  try{
    const specificID = request.params.id;
    const specificCurrency = await Currency.findByPk(specificID);
    
    if(specificCurrency){
      response.json(specificCurrency);
    }
    else{
      response.status(404).json({ error: 'resource not found' });
    }
  }
  catch (error){
    console.log("error get specific currency from it's ID");
  }
  })

//add row
cursRouter.post('/', async (request, response) => {
  console.log("recieve request");
  try {
    if (process.env.NODE_ENV==='development')
    {
      const currencyCode = request.body.currencyCode;
      const countryId = request.body.countryId;
      const conversionRate = request.body.conversionRate;
      console.log(countryId);

      if (!currencyCode || !countryId || !conversionRate) {
          response.status(400).json({ error: 'Missing required fields' });
      } else {
          console.log("inside else");
          await Currency.create({
              currencyCode: currencyCode,
              countryId: countryId,
              conversionRate: conversionRate
          }).then(newCurrency => {
              response.json(newCurrency);
          });
      }
    }else{
      const currencyCode = request.body.currencyCode;
      const conversionRate = request.body.conversionRate;
      if (!currencyCode || !conversionRate) {
        response.status(400).json({ error: 'Missing required fields' });
    } else {
        console.log("inside else");
        await Currency.create({
            currencyCode: currencyCode,
            conversionRate: conversionRate
        }).then(newCurrency => {
            response.json(newCurrency);
        });
    }
    }
  } catch (error) {
      console.error("Error adding currency:", error);
      response.sendStatus(500);
  }
});



/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
cursRouter.put('/:id/:newRate', async (request, response) => {
    const specificID = Number(request.params.id);
    const newRate = request.params.newRate;
    // const updateCurrencies = currencies;
  
    //find specific content we need it then select key=> conversionRate and change it with new value
    await Currency.update({conversionRate:newRate},{
      where: {
        id: specificID
      }
    });
    const updatedCurrency = await Currency.findByPk(specificID);
    response.json(updatedCurrency);
  });
  

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
cursRouter.delete('/:id', async(request, response) => {
  try{
    const specificID = request.params.id;
    // used find because i want to check if that currency existed or not
    const deletedCurrency = await Currency.findByPk(specificID);
    
    //if i want return new data without deleted currency i will use filter
    // const updateCurrencies = currencies.filter(cur => cur.id !== specificID);
    // console.log(deletedCurrency); 
    await Currency.destroy({
      where:{
        id:specificID
      }
    }).then(deleted =>
      {
        if(deleted === 1){
          console.log("deleted currency with id - ",specificID);
          response.json({deletingRecord :deletedCurrency});
        }
        else{
          // console.log('No currency record found with the specified ID.');
          response.status(404).json({ error: 'No currency record found with the specified ID.' });
        }

      })
    }catch (error) {
    console.error("Error deleting currency:", error);
    response.sendStatus(500);}
  
  })
  

module.exports = cursRouter;