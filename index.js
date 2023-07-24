const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


//middleware
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qkb4jt3.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

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
        //    client.connect();

        const collegesCollection = client.db('admiBucketDB').collection('colleges')
        const userCollection = client.db('admiBucketDB').collection('user')
        const studentCollection = client.db('admiBucketDB').collection('admission')


        app.get('/colleges', async (req, res) => {
            const result = await collegesCollection.find().toArray();
            res.send(result)
        })

        app.get('/colleges/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await collegesCollection.findOne(query)
            res.send(result);
        })


        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result)
        })
        app.get('/admission', async (req, res) => {
            const result = await studentCollection.find().toArray();
            res.send(result)
        })

        app.get('/usermail', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await studentCollection.find(query).toArray();
            res.send(result)
        })


        // send user data to mongodb 
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })
        // send user data to mongodb 
        app.post('/admission', async (req, res) => {
            const newStudent = req.body;
            const result = await studentCollection.insertOne(newStudent);
            res.send(result);
        })

       



      


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('admiBucket server is running')
})

app.listen(port, () => {
    console.log(`admiBucket server Running on: ${port}`)
})