const sequelize = require("../config/sequelize");
const {DataTypes} = require("sequelize");
const Country = require("./country");

//modle represent table and should be singular and start with Capital letter
const Currency = sequelize.define("Currency",{
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
    countryId:{
        type: DataTypes.INTEGER,
        references:{
            model: Country,
            key : 'id'
        }
    },
    conversionRate:{
        type: DataTypes.DECIMAL
    }
})

Currency.belongsTo(Country, { targetKey: 'id', foreignKey: 'countryId' });


module.exports = Currency;
 