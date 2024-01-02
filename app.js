
const express = require('express');
const bodyParser = require('body-parser'); // to connect data coming from PUT method
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/registration-form');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:{ type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const uri = 'mongodb://localhost:27017';
const databaseName = 'registration-form';

function registerUser(event) {
  event.preventDefault();
 }


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
  
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    // Saving with database
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db(databaseName);
    const collection = database.collection('users');

    const user = await collection.findOne({ email });

    if (user) {
      res.send(`
      <html>
          <body>
              <script>
                  alert('You have already registered!');
              </script>
          </body>
      </html>
  `);
    } else {
        await newUser.save();
        res.sendFile(__dirname + '/register.html');
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

