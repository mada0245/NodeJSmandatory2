const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const { connect, close } = require('../database/connection');

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.password || Object.keys(req.body).length > 2) {
      res.status(400).send('Invalid input');
    } else {
      try {
        const database = await connect();
        const collection = database.collection('users');

        const adminExists = await collection.findOne({ name: "admin" });

        if (!adminExists) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash("pass", salt);

          const theAdmin = {
            name: "admin",
            email: "admin@example.com",
            password: hashedPassword
          };
          await collection.insertOne(theAdmin);
        }
  
        const user = await collection.findOne({ name: req.body.name });

        if (!user) {
          return res.status(400).send('Wrong credentials');
        }
  
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  
        if (!isPasswordValid) {
            return res.status(400).send('Wrong credentials');
        }
  
        const token = jwt.sign({_id : user._id}, config.get('jwtPrivateKey'));
        res.send(token);

      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } finally {
        await close();
      }
    }
  });

module.exports = router;