"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _expressValidation = require("express-validation");

var _UserRouter = _interopRequireDefault(require("./api/UserRouter"));

var _InventoryRouter = _interopRequireDefault(require("./api/InventoryRouter"));

var express = require('express');

var app = express();
app.use(express.json());

var bcrypt = require('bcryptjs');

app.use(express.json());

var cors = require('cors');

app.use(cors());

var mysql = require('mysql2/promise');

var dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/api/v1", _UserRouter["default"], _InventoryRouter["default"]);
app.use(function (err, request, response, next) {
  if (err instanceof _expressValidation.ValidationError) {
    return response.status(err.statusCode).json(err);
  }

  response.status(err.status || 500);
  response.json({
    code: err.code,
    message: err.message
  });
}); // DATABASE SETTINGS

var pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  waitForConnections: process.env.waitForConnections,
  connectionLimit: process.env.connectionLimit,
  queueLimit: process.env.queueLimit
});
exports.pool = pool;

if (pool.state === 'disconnected') {
  console.log("Server Down");
} else {
  console.log("Connected to database");
} //Hashing Password
// const hashPassword = async (userPassword) => {
//   const convertedUserPassword = userPassword.toString();
//   const harshPassword = await bcrypt.hash(convertedUserPassword, 10);
//   return harshPassword;
// };
// END POINTS  
// CREATE USER END POINT
// app.post('/api/users', async (req, res) => {
//     const {error} = validateUsers(req.body);
//     if (error)  return  res.status(400).send({error: error.details[0].message });
//     const {firstName, lastName, mobilePhone, email, password, role } = req.body
//     try{
//         const harshedPassword = await hashPassword(password)
//         const userExist = await pool.query('select email from users where email=?', [email])
//         if (userExist[0].length > 0){
//             res.status(400).send('User already exist')
//         } else{
//             const result = await pool.query('INSERT into users SET firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?',  [firstName, lastName, mobilePhone, email, harshedPassword, role])
//             console.log(result[0])
//             res.send(result[0]);
//         }
//     } catch(error){
//         console.log(error)
//         res.status(500).send(error)
//     }
// });
//GETTING INDIVIDUAL STAFF
// app.get('/api/users/:id', async (req, res) => {
//     try{
//         const userId = req.params.id
//         const singleUser= await pool.query('select * from users where user_id=?', [userId])
//         if (singleUser[0].length < 1 ){
//             res.status(400).send('User does not exist')
//         } else
//         res.status(200).send({message: "User fetched sucessfully", data : singleUser[0][0]})
//     }catch(err){
//      res.status(500).send({message: "errro occured", data: err})
//     }
//   });


var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});