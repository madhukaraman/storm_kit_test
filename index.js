const express = require('express');
const bodyParser = require('body-Parser');
const dotenv = require('dotenv');

const tradesRoutes = require('./routes/trades.js');
const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = 5000;
const connectDatabase = require('./config/database')

dotenv.config({path: 'config/config.env'})

connectDatabase();

app.use(bodyParser.json());
app.use('/trades', tradesRoutes)
app.use('/user', authRoutes)

app.get('/', (req,res)=>{
    res.send('Hello from home ')
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})