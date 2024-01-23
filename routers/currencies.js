const cursRouter = require('express').Router()
const Currency = require("../models/currency");


/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
// let currencies = [
//     {
//       id: 1,
//       currencyCode: "CDN",
//       country: "Canada",
//       conversionRate: 1
//     },
//     {
//       id: 2,
//       currencyCode: "USD",
//       country: "United States of America",
//       conversionRate: 0.75
//     }
//   ]



/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
cursRouter.get('/', (request, response) => {
    response.send('Welcome to Currency table')
  })

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
cursRouter.get('/api/currency/', (request, response) => {
  try{
    Currency.findAll().then(currencies =>{
      response.status(200).send(currencies);
    })
  }
  catch (error){
    console.log("error retreving currencies");
  }
  })

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
cursRouter.get('/api/currency/:id', (request, response) => {
  try{
    const specificID = Number(request.params.id);
    const specificCurrency = Currency.findByPk(cur =>cur.id === specificID);
    
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


/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
cursRouter.post('/api/currency/', async (request, response) => {
  try{
    // const currencyCode = request.body.currencyCode ;
    // const countryId = request.body.countryId;
    // const conversionRate = request.body.conversionRate;
  
    // if(!currencyCode || !countryId || !conversionRate){
    //   response.status(400).json({ error: 'content missing' });
    // }
    // else{
      await Currency.create({
        currencyCode: request.body.currencyCode,
        countryId: request.body.countryId ,
        conversionRate: request.body.conversionRate
      }).then(newCurrency=>{
        response.json(newCurrency);
      })
    }
    // }
    catch(error){
      console.log("error adding currency: ",error);
      response.sendStatus(500);
    }
    // newCurrency = {
    //   id : 3,
    //   currencyCode: currencyCode,
    //   country: country ,
    //   conversionRate: conversionRate
    // }
  })



/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
cursRouter.put('/api/currency/:id/:newRate', async (request, response) => {
    const specificID = Number(request.params.id);
    const newRate = request.params.newRate;
    // const updateCurrencies = currencies;
  
    //find specific content we need it then select key=> conversionRate and change it with new value
    await Currency.update({conversionRate:newRate},{
      where: {
        id: specificID
      }
    }).then(response.json(Currency.findByPk(cur =>cur.id === specificID)))
  });
  

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
cursRouter.delete('/api/currency/:id', (request, response) => {
    const specificID = Number(request.params.id);
    // used find because i want to check if that currency existed or not
    const deletedCurrency = currencies.find(cur => cur.id === specificID);
    
    //if i want return new data without deleted currency i will use filter
    const updateCurrencies = currencies.filter(cur => cur.id !== specificID);
    //console.log(updateCurrencies); 
  
    if(deletedCurrency){
      response.sendStatus(204);
    }
    else{
      response.status(404).json({ error: 'resource not found' });
    }
  
  })
  

module.exports = cursRouter;