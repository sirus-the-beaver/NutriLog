const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');
const rateLimit = require('./middleware/rateLimit');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const foodLogRoutes = require('./routes/foodLogRoutes');
const exerciseLogRoutes = require('./routes/exerciseLogRoutes');
const progressRoutes = require('./routes/progressRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimit);

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

app.use('/api', auth);
app.use('/api', purchaseRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', foodLogRoutes);
app.use('/api', exerciseLogRoutes);
app.use('/api', progressRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});