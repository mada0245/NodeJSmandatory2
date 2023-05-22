const express = require('express');
const cors = require('cors');
const { connect, close } = require('../database/connection');

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post('/', async (req, res) => {
  if (!req.body.email || Object.keys(req.body).length > 1) {
    res.status(400).send('Invalid input');
  } else {
    try {
      const database = await connect();
      const collection = database.collection('users');

      const existingUserByEmail = await collection.findOne({ email: req.body.email });

      if (existingUserByEmail) {
        //nodemailer
        res.send(`An email has been sent to ${req.body.email}`);
      }
      else{
        res.status(400).send('The email does not exist');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      await close();
    }
  }
});

module.exports = router;