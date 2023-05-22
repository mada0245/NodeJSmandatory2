const { MongoClient } = require('mongodb');

const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('AuthSystemDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

function close() {
  return client.close();
}

module.exports = { connect, close };