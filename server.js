require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const i18nextHttpMiddleware = require('i18next-http-middleware');
const i18next = require('./middleware/language');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-keeping';

app.use(express.json());
app.use(i18nextHttpMiddleware.handle(i18next));

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrowers', borrowRoutes);
app.use('/api/library', libraryRoutes);

app.get('/', (req, res) => {
    res.send(req.t('welcome_message'))
})


// Connect to MongoDB and start the server
mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err.message));