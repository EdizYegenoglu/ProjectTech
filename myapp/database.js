// require('dotenv').config();

// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useUnifiedTopology: true });
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } 
//   catch (err) {
//     console.log(err.stack);
//   }
  
//   finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);