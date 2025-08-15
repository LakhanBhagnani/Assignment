const express = require('express');
const mongoose = require('mongoose');
const routes = require('./mongoRoutes');
const cors = require("cors");

mongoose.connect('mongodb+srv://lakhanbhagnani:KC0UAQvsgJaGslSy@recruitment.9nuxser.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(3001, () => console.log('Server running on port 3001'));
