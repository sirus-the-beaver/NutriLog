const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error(error);
});

app.use('/api', userRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', subscriptionRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});