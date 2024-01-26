const Country = require("./models/country");

// Country.destroy().then(()=>
// {
//     console.log("Destroy country table")
// })

// Country.sync({ force: true })
//   .then(() => {
//     console.log('Table Country dropped successfully');
//   })
//   .catch((error) => {
//     console.error('Error dropping table:', error);
//   });


  Country.destroy({
    where: {},
    truncate: false
  })