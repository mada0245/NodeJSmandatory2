const express = require('express');
const cors = require('cors');
const { connect, close } = require('../database/connectionToken');

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post('/add', async (req, res) => {
  if (!req.body.token || Object.keys(req.body).length > 1) {
    res.status(400).send('Invalid input');
  } else {
    try {
      const database = await connect();
      const collection = database.collection('tokens');

      const newToken = {
        token: req.body.token
      };
      await collection.insertOne(newToken);

      res.send('You have a valid token');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      await close();
    }
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const database = await connect();
    const collection = database.collection('tokens');
    
    await collection.deleteMany({});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    await close();
  }
});

router.get('/get', async (req, res) => {
  try {
    const database = await connect();
    const collection = database.collection('tokens');
    
    const tokens = await collection.find().toArray();
    
    if (tokens.length === 0) {
      res.status(404).send('No tokens found');
    } else {
      res.send(tokens[0].token);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    await close();
  }
});

module.exports = router;