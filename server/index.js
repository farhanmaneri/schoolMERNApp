const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')

const userRoutes = require('./routes/user');
const schoolRoutes = require('./routes/school');
const contactRoutes = require('./routes/contact');
const leaveRoutes = require('./routes/leave');
const addUpload = require('./controllers/upload');
require('dotenv').config()

const app = express()
app.use(morgan('tiny'))
app.use(express.json()) 
app.use(cors())


const port = process.env.PORT || 3000



const  dbConnection=async()=>{
  let connectonURI = process.env.MONGODB_CONNECTION_URI
  await mongoose.connect(connectonURI,{  useNewUrlParser: true,
    useUnifiedTopology: true,})
  console.log('connected to db')
 }
dbConnection().catch((err)=>console.error(err))

app.get('/v1', function (req, res) {
  res.send('api is working')
})
// for testing purposes uploading files

const storage = multer.memoryStorage()
const upload = multer({storage});

app.post('/upload', upload.single('file') , addUpload)

app.use('/schools', schoolRoutes );
app.use('/contacts', contactRoutes);
app.use('/users', userRoutes);
app.use('/leave', leaveRoutes);

app.listen(port,  ()=>{
    console.log('working.......')
})