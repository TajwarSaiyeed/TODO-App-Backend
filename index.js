const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {

    try {
        const todosCollection = client.db("todo-app-backend").collection("todos");

        // post todo

        app.post('/todo', async (req, res) => {
            const todo = req.body;
            const result = await todosCollection.insertOne(todo);
            res.status(201).send(result);
        });


        // get al todos

        app.get("/todos", async (req, res) => {
            const query = {}
            const result = await todosCollection.find(query).toArray();
            res.status(200).send(result);
        })

        // get single todo

        app.get("/todo/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await todosCollection.findOne(query);
            res.status(200).send(result);
        })

        // update todo by id => status pending to done

        app.put("/todo/:id/done", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: "done"
                }
            }
            const result = await todosCollection.updateOne(filter, updateDoc, options);
            res.status(201).send(result);
        })

        // delete todo by id
        app.delete("/todo/:id/delete", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await todosCollection.deleteOne(query);
            res.status(200).send(result);
        })



    } finally {
    }

}
run().catch(err => console.log(err))





app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
