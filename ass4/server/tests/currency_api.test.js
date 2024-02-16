/**
 * Necessary imports, make sure you have these packages installed in your server directory
 */
const supertest = require('supertest')
const sequelize = require('../config/sequelize') // Provide a path to your config.js or database.js file, wherever you export that sequelize
const helper = require('./test_helper')
const server = require('../server') // Provide a path to your server.js file, or wherever you are starting your server and add your endpoints via router
const api = supertest(server) // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Setup currencies table (if not already setup)
  await helper.init()

  // Clear data and load new entries for tests
  await helper.clearData()
  await helper.load()
})

describe('GET tests', () => {
  /**
   * Completed:
   * This is an example test, where we are checking if we have 2 blogs in the database as expected
   * we added the two blogs in the 'beforeEach' setup phase
   */
  test('we have 2 currencies at the start', async () => {
    const response = await api.get('/api/currency')
    expect(response.body).toHaveLength(2)
  })

  /**
   * Completed:
   * This is another example test, where we are checking if we are able to get a particular currency as expected.
   * Our test will get the first currency, the Canadian one that we added.
   * You can confirm the identiy of the currency based on the conversionRate and the currencyCode
   * We are restricting it to these two, rather than a complete equals, since the table provides other extraneous values
   * such as time of last update and so on
   */
  test('getting a specific currency', async () => {
    const canadianCurrency = helper.initialCurrencies[0]
    const getId = canadianCurrency.id

    // Verify that we get the same currency
    const response = await api
      .get(`/api/currency/${getId}`)
      .expect(200)

    // As stated above, we will compare the conversionRate and currencyCode
    const currencyReceived = response.body
    expect(canadianCurrency.conversionRate).toEqual(Number(currencyReceived.conversionRate))
    expect(canadianCurrency.currencyCode).toEqual(currencyReceived.currencyCode)
  })
})

/**
 * The tests for POST, PUT, and DELETE are left un-implemented, and you will have to complete them
 * All the helper functions have been provided, and the examples as well are sufficient
 * You will need to do some reading on supertest documentation as well
 * 
 * IMPORTANT: You are only working with currencies, we removed the countries connection to make it a bit simpler
 */

describe('POST tests', () => {
  // Add a currency, and verify that a currency is added to our database
  test('adding a currency', async () => {
    const newCurrencyData = {
      "currencyCode": "JOD", 
      "conversionRate": 0.55 
    };

    const response = await api.post('/api/currency')
      .send(newCurrencyData)
      .expect(200);
    
    //expect(response.body).toHaveLength(3);
    expect(response.body.currencyCode).toEqual(newCurrencyData.currencyCode);
    expect(Number(response.body.conversionRate)).toEqual(newCurrencyData.conversionRate);
    
  })
})

describe('PUT tests', () => {
  // Update a currency, and verify that a currency has been updated
  test('adding a currency', async() => {
    const canadianCurrency = helper.initialCurrencies[0]
    const getId = canadianCurrency.id
    const newRate = 0.99

    // Make a PUT request to the server endpoint with the updated data
    const response = await api.put(`/api/currency/${getId}/${newRate}`) 
          .expect(200); 

    // Verify that the response contains the updated currency data
    expect(response.body.currencyCode).toEqual("CDN");
    expect(response.body.conversionRate).toEqual("0.99");
 

  })
})

describe('DELETE tests', () => {
  // Delete a currency, and verify that a currency has been deleted
  test('adding a currency', async() => {
    const id = 2;
    const response = await api.delete(`/api/currency/${id}`) // Replace {currencyId} with the actual ID of the currency you want to delete
      .expect(200);

    const getAllResponse = await api.get('/api/currency');
    const currenciesAfterDeletion = getAllResponse.body;

    expect(currenciesAfterDeletion).toHaveLength(1);
 
  })
})

afterAll(async () => {
  // Closes connection after all tests run
  server.close()
  await sequelize.close()
})

