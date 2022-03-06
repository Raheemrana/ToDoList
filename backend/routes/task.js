const router = require("express").Router();
const sqlite3 = require("sqlite3").verbose();
const verify = require('./verifyToken')
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

let db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("DB connected");
});

// Register User
router.post("/create", verify, async (req, res) => {
    let query = 'INSERT INTO tasks (id, desc, priority, labels, user_name) VALUES(?,?,?,?,?)'
    db.run(query,[uuidv1(),req.body.desc,req.body.priority,req.body.labels,req.user_name],(err)=>{
        if(err){
            console.log(err.message)
            return res.status(400).send(err)
        }
        else{
            console.log("task created")
            return res.status(200).send('task added')
        }
    })

    query = 'SELECT * FROM tasks'
    db.all(query,(err,rows)=>{
        console.log(rows)
    })
});

router.get("/getall",verify,(req,res)=>{
  console.log(req.user_name)

  let query = 'SELECT * FROM tasks WHERE user_name = ?'
  db.all(query,[req.user_name], (err,rows)=>{
    if(err){return res.status(400).send(err.message)}
    else return res.status(200).send(rows)
  })
})

module.exports = router;
