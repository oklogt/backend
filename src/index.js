const express = require('express')
const { mongoose } = require('mongoose')
const app = express()
const port = 5000
const url="mongodb+srv://oklogt:12345@cluster0.tw1hfh8.mongodb.net/?retryWrites=true&w=majority"

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
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello World!')
})
app.get('/express_backend', (req, res) => { 
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

