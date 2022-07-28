const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { application } = require('express');
// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4vhi1hx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri)

async function run() {
    try {
        await client.connect();
        const database = client.db('online_shop');
        const productCollection = database.collection('products');
        // GET API
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({})
            // const products = await cursor.limit(5).toArray();
            const products = await cursor.toArray();
            const count = await cursor.count();
            res.send({ count, products });
        })
        // console.log("uri")
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("ema john node mongo server")
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})