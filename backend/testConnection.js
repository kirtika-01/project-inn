const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dwiedikirtika2:kittu200401@completeprojectin.dzhbj.mongodb.net/users?retryWrites=true&w=majority&tls=true"
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);