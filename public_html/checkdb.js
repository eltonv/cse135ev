const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function checkDB() {
  try {
    await client.connect();
    const db = client.db('analytics');

    const staticDocs = await db.collection('static').find().toArray();
    console.log('Static:', staticDocs);

    const perfDocs = await db.collection('performance').find().toArray();
    console.log('Performance:', perfDocs);

    const activityDocs = await db.collection('activity').find().toArray();
    console.log('Activity:', activityDocs);
  } finally {
    await client.close();
  }
}

checkDB();
