const router = require("express").Router();
const sqlite3 = require("sqlite3").verbose();
// const User = require("../model/User");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const secret = require('../SecretKey');

let db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("DB connected");
});

// Register User
router.post("/register", async (req, res) => {
  console.log("inside registration");
  console.log(req.body);

  //checking the repeatition of the users
  let query = "SELECT * FROM users WHERE user_name = ?";
  db.all(query, [req.body.username], async (err, rows) => {
    if (err) {
      console.log(err);
    }
    else if (rows.length === 0) {
      //creating the hashed of password so it wont be readable in the db too
      const salt = await bcrypt.genSalt(10);
      const Hashed_pass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      query = "INSERT INTO users (user_name,email,password) VALUES(?,?,?)";
      db.run(query, [req.body.username, req.body.email, Hashed_pass], (err) => {
        if (err) {
          return res.status(400).send("Some error");
        }

        query = "SELECT * FROM users";
        db.all(query, (err, rows) => {
          if (err) {
            console.log(err);
          }
          if (rows.length === 0) {
            console.log("empty");
          } else console.log(rows);
        });

        return res.status(200).send("Registration successful");
      });
    } else {
      console.log("username already exists");
      return res.status(400).send("user already registered");
    }
  });
});


//sign in
router.post("/login", async (req, res) => {
  //find user with given user name
  console.log(req.body);
  let query = 'SELECT password FROM users WHERE user_name = ?'
  db.all(query,[req.body.username],async (err,pass)=>{
    if(err)
    {
      return res.status(400).send(err.message)
    }
    else if (pass.length !== 0){
      const valid_pass = await bcrypt.compare(req.body.password, pass[0].password);
      if (!valid_pass) 
      {
        return res.status(400).send("Invalid Password")
      }
      else{
        //Create token for logged in user
        // it would be use as a middleware in future
        const token = jwt.sign({ _id: req.body.username }, secret);
        //authenticated and token sent
        res.status(200).send({ token: token });
      }
    }
    else 
    {
      return res.status(400).send("User not available")
    }
  })
});



module.exports = router;
