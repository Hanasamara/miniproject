const {Sequelize} = require("sequelize");
const pg = require('pg')
const path = require("path")
require("dotenv").config({path: path.join(__dirname,'../.env')});//can pass .env path


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectModule:pg,
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized: true
        }
    }
});


// Test connection
const testConnection = async() => {
    try{
        await sequelize.authenticate();
        console.log(`Successfully connected to database ${process.env.DB_NAME}`)

    }
    catch(error){
        console.log(`Error Connection to ${process.env.DB_NAME}`)
        console.log(error)
    }
};
 testConnection();

module.exports = sequelize;