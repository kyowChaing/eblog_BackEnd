const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tovzgtl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const allBlogsCollection=client.db('eblog').collection('allblogs');

    app.get('/allblogs',async(req,res)=>{
        const cursor= allBlogsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    });
    
    app.post('/allblogs',async(req,res)=>{
       const blogdata=req.body;
       const result=await allBlogsCollection.insertOne(blogdata);
       res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('hello from server');
})

app.listen(port,()=>{console.log(`runnig port is ${port}`)})