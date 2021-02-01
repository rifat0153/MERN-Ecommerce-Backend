const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');


//envrionment variables 
env.config();
//mongodb connection
//mongodb+srv://root:<password>@cluster0.cacf0.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.cacf0.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then( () => {
    console.log('Database Connected');
} );

app.use(bodyParser());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running is on PORT ${process.env.PORT}`);
});