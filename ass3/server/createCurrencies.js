const Currency = require("./models/currency");

Currency.sync().then(()=>
{
    console.log("Sync currency table");
    Currency.bulkCreate([
    { currencyCode :'SD',countryId:2020, conversionRate:1.79},
    { currencyCode :'OR',countryId:5001, conversionRate:0.25}
    ])
})