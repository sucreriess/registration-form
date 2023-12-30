const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//mongodb
mongoose.connect('mongodb://localhost/registration-form', { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
  username:{ type: String, required: true },
  email: { type: String, required: true },
  password:{ type: String, required: true }
});

const User = mongoose.model('User', userSchema);

