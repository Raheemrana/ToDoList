const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));

//connect to DB
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('DB connected');
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Creating table of users
let query = 'CREATE TABLE users (user_name text PRIMARY KEY,email text NOT NULL,password text NOT NULL)'

db.run(query,(err)=>{
    if (err){ return console.log(err.message)}

    console.log('Table created')
});

// Creating Table of tasks
query = 'CREATE TABLE tasks (id text PRIMARY KEY,desc text NOT NULL,priority text NOT NULL,labels text, user_name text NOT NULL, FOREIGN KEY (user_name) REFERENCES users (user_name) )'

db.run(query,(err)=>{
    if (err){ return console.log(err.message)}

    console.log('Table2 created')
});


//Middlewares
app.use(express.json());
//Import Routes
const authRoute = require('./routes/auth')
const taskRoute = require('./routes/task')

//Route middlewares
app.use('/auth', authRoute)
app.use('/task', taskRoute)

app.listen(5000, ()=> console.log('Server is running'))