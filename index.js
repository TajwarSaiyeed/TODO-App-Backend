const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());



const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


const run = () => {

    try {

    } finally {

    }

}
run().catch(err => console.log(err))





app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
