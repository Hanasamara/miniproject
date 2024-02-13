const Country = require("../models/country");
const Currency = require("../models/currency");
const currCountry = require('express').Router();
const {QueryTypes} = require("sequelize");

currCountry.get('/', (request, response) => {
    try{
        Currency.findAll({
            attributes:["currencyCode"],
            include : {
                model:Country,
            attributes:["name"]
        }
        }).then((result)=>{
            response.json(result);
        })
    }
    catch (error){
      console.log("error retreving records");
    }
    })

// Currency.belongsTo(Country, { targetKey: 'id', foreignKey: 'countryId' });

module.exports = currCountry;