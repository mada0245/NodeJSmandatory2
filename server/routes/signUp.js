const auth = require('../middleware/auth');
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const { connect, close } = require('../database/connection');

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post('/', auth, async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password || Object.keys(req.body).length > 3) {
    res.status(400).send('Invalid input');
  } else {
    try {
      const database = await connect();
      const collection = database.collection('users');

      const existingUserByName = await collection.findOne({ name: req.body.name });
      const existingUserByEmail = await collection.findOne({ email: req.body.email });

      if (existingUserByName || existingUserByEmail) {
        return res.status(400).send('User with the same name or email already exists');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      };
      await collection.insertOne(newUser);

      res.send('User has been signed up');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      await close();
    }
  }
});

module.exports = router;