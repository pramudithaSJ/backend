const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

const productRoutes = require('./routes/product-route.js');

dotenv.config();

app.use(cors());
app.options('*', cors());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.log(err);
});

app.use(express.json());

const RunningPort = process.env.PORT || 8080;
app.listen(RunningPort, () => {
    console.log(`Server is running on port ${RunningPort}`);
});

app.use('/product', productRoutes)
