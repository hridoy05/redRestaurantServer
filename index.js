const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

 
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true});

app.get('/foods',(req,res)=>{
    client.connect(err => {
        const collection = client.db("restaurant").collection("foods");
        collection.find().toArray((err,documents)=>{
            
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
           
            
        });
        
       // client.close();
      });
    
})

app.post('/addFoods', (req,res) => {

    const food = req.body; 
    let client = new MongoClient(uri, { useNewUrlParser: true});

    client.connect(err => {
        const collection = client.db("restaurant").collection("foods");
        collection.insert(food,(err,result)=>{
            
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
           
            
        });
        
        client.close();
      });
    
    
})
const port = process.env.PORT || 5000

app.listen(port,()=> console.log("listening to port 5000"));