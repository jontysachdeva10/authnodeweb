const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(expreess.json({ extended: false }));

const registerUser = require('./routes/register');
const authUser = require('./routes/auth');
const loginUser = require('./routes/login');

app.use('/register', registerUser);
app.use('/auth', authUser);
app.use('/login', loginUser);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));