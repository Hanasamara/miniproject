const Country = require("../models/country");
const Currency = require("../models/currency");
const currCountry = require('express').Router();
const {QueryTypes} = require("sequelize");

currCountry.get('/', (request, response) => {
    try{
        const result = Currency.findAll({
            include : Country
        });
        response.json(result);
    }
    catch (error){
      console.log("error retreving records");
    }
    })

Currency.belongsTo(Country, { targetKey: 'id', foreignKey: 'countryId' });

module.exports = currCountry;