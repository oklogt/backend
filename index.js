require('dotenv').config()
const express = require('express')
const { mongoose } = require('mongoose')
const app = express()
const port = 5000
const url="mongodb+srv://oklogt:12345@cluster0.tw1hfh8.mongodb.net/?retryWrites=true&w=majority"
const {logger}= require('./middleware/logEvents')
const cors =require('cors')
const errorHandler= require('./middleware/errorHandler')
const corsOption =require('./config/corsOption')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./auth/passport')
require('./auth/passportGoogleSSO')
require('./routes/api/googlelogin')
require('./routes/api/user')
const session2 = require('express-session')

app.use(logger);
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(express.json());

// app.use(session2({}));
app.use(session2({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/players',require('./routes/api/players'));
app.use('/api',require('./routes/api/googlelogin'));
app.use('/api',require('./routes/api/user'));



async function connect(){
  try{
    mongoose.set('strictQuery', false)
    await mongoose.connect(url)
    console.log("connected to MongoDB")
  }catch(error){
    console.error(error);
  }
}

connect();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/express_backend', (req, res) => { 
  res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

