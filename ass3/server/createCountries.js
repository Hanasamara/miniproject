const Country = require("./models/country");

Country.sync().then(()=>
{
    console.log("Sync country table");
    Country.bulkCreate([
    { id:2020 , name: 'Sudan' },
    { id:5001, name: 'Oman' }
    ])
})


