const sequelize = require("../config/sequelize");
const {DataTypes} = require("sequelize");

//modle represent table and should be singular and start with Capital letter
const Country = sequelize.define("Country",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING
    }
},
{moduleName:'country'}
)

module.exports = Country;