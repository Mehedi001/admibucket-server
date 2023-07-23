const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;



run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('admiBucket server is running')
})

app.listen(port, () => {
    console.log(`admiBucket server Running on: ${port}`)
})