const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const userRoutes = require('./routes/user.js');

env.config();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(process.env.URL,{
    useNewUrlParser:true, 
    useUnifiedTopology:true
    
}
).then(()=>{
    console.log('Database is connected');
})
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());
app.use('/api',userRoutes);

app.listen( process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.PORT}`);
})





