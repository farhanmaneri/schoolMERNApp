const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const schoolRoutes = require('./routes/school');
const contactRoutes = require('./routes/contact');
require('dotenv').config()

const app = express()
app.use(morgan('tiny'))
app.use(express.json()) 
app.use(cors())

const port = process.env.PORT || 8080
const host = process.env.HOST || 'localhost'


const  dbConnection=async()=>{
  let connectonURI = process.env.MONGODB_CONNECTION_URI
  await mongoose.connect(connectonURI,{  useNewUrlParser: true,
    useUnifiedTopology: true,})
  console.log('connected to db')
 }
dbConnection().catch((err)=>console.error(err))

// app.get('/', function (req, res) {
//   res.send('Hello World !')
// })

app.use('/schools', schoolRoutes );
app.use('/contacts', contactRoutes);

app.listen(port, host, ()=>{
    console.log('working.......')
})