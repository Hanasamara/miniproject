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
cursRouter.get('/about', (request, response) => {
    response.send('Welcome to Currency table')
  })

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
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

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
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


/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
cursRouter.post('/', async (request, response) => {
  try {
      const currencyCode = request.body.currencyCode;
      const countryId = request.body.countryId;
      const conversionRate = request.body.conversionRate;
      console.log(countryId);

      if (!currencyCode || !countryId || !conversionRate) {
          response.status(400).json({ error: 'Missing required fields' });
      } else {
          await Currency.create({
              currencyCode: currencyCode,
              countryId: countryId,
              conversionRate: conversionRate
          }).then(newCurrency => {
              response.json(newCurrency);
          });
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