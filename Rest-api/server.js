const express = require("express");
const assert = require("assert");
const cors=require('cors')
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// mongodb://localhost:27017

const MongoURL = "mongodb://localhost:27017";
const dbName='API'
MongoClient.connect(MongoURL,{ useNewUrlParser: true }, (err, client) => {
  assert.equal(err, null, "connection failed");
  console.log("success of connection between db and server");
  var db = client.db(dbName);


app.get("/",(req,res)=>{
res.send("welcome to friends API")
})


// ADD Contact
app.post("/contact",(req,res)=>{
  const {body} =req;
  db.collection('contacts').insertOne(body,(err,data)=>{
    if(err){
      res.status(400).send('failed to insert')
    }
    else{
      res.send(body)
    }
  })
})

  // GET ALL Contacts
  app.get("/contact", (req, res) => {
    db.collection('contacts').find().toArray((err, data) => {
      if (err) {
        res.status(404).send('could not fetch data')

      }
      else { res.send(data) }
    })
  })

  // GET ONE SPECIFIC contact
  app.get("/contact/:id", (req, res) => {
    const id = req.params.id;
    db.collection('contacts').findOne({ _id: ObjectID(id) }, (err, data) => {
      if (err) {
        res.status(404).send('contact not exist')

      }
      else {
        res.send(data)
      }
    })
  })

// modify Contact
app.put("/modify-contact/:id", (req, res) => {
 let id=(req.params.id)
 let modifiedContact=req.body
  db.collection('contacts').findOneAndUpdate({
    _id: ObjectID(id)
  }, {
      $set: { ...modifiedContact }
        
      },(err, data) => {
    if (err) {
      res.status(400).send('failed to modify contact')
    } else {
      res.send('product was modified')
    }
  })
})

 

// Remove Contact
  app.delete("/delete/:id", (req, res) => {
  let IDcontactToRemove=req.params.id
  db.collection('contacts').findOneAndDelete({
        _id: ObjectID(IDcontactToRemove)
      } , (err, data) => {
    if (err) {
      res.status(400).send('failed to Remove')
    } else {
      res.send('contact was deleted')
    }
  })
})

});



app.listen(4000, () => {
  console.log("server is listen on port 4000");
});
