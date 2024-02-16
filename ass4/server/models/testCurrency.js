const sequelize = require("../config/sequelize");
const {DataTypes} = require("sequelize");

//modle represent table and should be singular and start with Capital letter
const testCurrency = sequelize.define("testCurrency",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    currencyCode :{
        type: DataTypes.STRING,
        unique: true
    },
    conversionRate:{
        type: DataTypes.DECIMAL
    }
},
{moduleName:'testCurrency'}
)



module.exports = testCurrency;
 