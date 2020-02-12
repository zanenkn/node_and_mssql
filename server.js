require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const sql = require("mssql")
const app = express()

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//CORS Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization")
  next()
})

//Setting up server
const server = app.listen(process.env.DB_PORT, function () {
  const port = server.address().port
  console.log("App now running on port", port)
})

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_DB
}

//GET API
app.get("/api/employees", function (req, res) {
  sql.connect(config, function (err) {

    if (err) console.log(err)

    // create Request object
    const request = new sql.Request()

    // query to the database and get the records
    request.query('select * from TestSchema.Employees', function (err, recordset) {

      if (err) console.log(err)

      // send records as a response
      console.log(recordset)
      res.send(recordset)
    })
  })
})

//GET for one employees pets
app.get("/api/employees/:id/pets", function (req, res) {
  sql.connect(config, function (err) {

    if (err) console.log(err)

    // create Request object
    const request = new sql.Request()

    // query to the database and get the records
    request.query(`select TestSchema.Pets.Name, TestSchema.Pets.Type from TestSchema.Employees inner join TestSchema.Pets on TestSchema.Employees.Id = TestSchema.Pets.OwnerId where TestSchema.Employees.Id=${req.params.id}`, function (err, recordset) {

      if (err) console.log(err)

      // send records as a response
      console.log(recordset)
      res.send(recordset)
    })
  })
})

//POST API for pets
app.post('/api/pets',function(req, res){

  sql.connect(config, function (err) {
    if (err) console.log(err)

    // create Request object
    const request = new sql.Request()
    const name = req.body.Name;
    const type = req.body.Type;

    request.query(`INSERT INTO TestSchema.Pets (Name, Type, OwnerId) VALUES ('${name}', '${type}', (select id from TestSchema.Employees where name='${req.body.OwnerName}'))`, function (err) {
      if (err) console.log(err)
      res.send('Success yo')
    })
  })
})

//POST API for employees
app.post('/api/employees',function(req, res){
  var name = req.body.Name
  var location = req.body.Location


  sql.connect(config, function (err) {
    if (err) console.log(err)

    // create Request object
    const request = new sql.Request()

    request.query(`INSERT INTO TestSchema.Employees (Name, Location) VALUES ('${name}', '${location}')`, function (err) {
      if (err) console.log(err)
      res.send('Success yo')
    })
  })
})


//DELETE API
app.delete('/api/employees/:id',function(req, res){
  sql.connect(config, function (err) {
    if (err) console.log(err)

    // create Request object
    const request = new sql.Request()

    request.query(`DELETE from TestSchema.Employees WHERE Id='${req.params.id}'`, function (err) {
      if (err) console.log(err)
      res.send('Deleted')
    })
  })
})






// app.post("/api/employees", function (req, res) {
//   sql.connect(config, function (err) {

//     if (err) console.log(err)

//     // create Request object
//     const request = new sql.Request()

//     // query to the database and get the records
//     request.query(`INSERT INTO TestSchema.Employees (Name, Email, Location) VALUES (${req.body.Name, req.body.Email, req.body.Location})`, function (err, recordset) {

//       if (err) console.log(err)

//       // send records as a response
//       console.log(recordset)
//       res.send(recordset)
//     })
//   })
// })




// app.post("/api/user", function (req, res) {
//   const query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password"
//   executeQuery(res, query);
// });

// //PUT API
// app.put("/api/user/:id", function (req, res) {
//   const query = "UPDATE [user] SET Name= " + req.body.Name + " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//   executeQuery(res, query);
// });

// // DELETE API
// app.delete("/api/user /:id", function (req, res) {
//   const query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//   executeQuery(res, query);
// });