const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')
const cloudinary = require('cloudinary');

const userRoutes = require('./routes/user');
const schoolRoutes = require('./routes/school');
const contactRoutes = require('./routes/contact');
require('dotenv').config()

const app = express()
app.use(morgan('tiny'))
app.use(express.json()) 
app.use(cors())




const port = process.env.PORT || 5000

const fs = require('fs')

//Configure Cloudinary
 cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
// cloudinary.config({ 
//   cloud_name: 'farahnmaneri', 
//   api_key: '926179671519339', 
//   api_secret: '-doeeiTXUP3FjROlgPc0pTzl2-g' 
// });

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

const path = require('path')
const storage = multer.memoryStorage()
const upload = multer({storage});


const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
});
const File = mongoose.model('File', fileSchema);

var dir = './uploads/profiles/';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}
app.post('/upload',upload.single('file'), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({message:"No file to upload"})
    }

    // Write the buffer to a temporary file
  


    const tempFilePath = path.join(__dirname, 'uploads/profiles/', req.file.originalname);
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Upload the temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, { resource_type: 'auto' });

    // Save file reference in MongoDB
    const newFile = new File({
      filename: req.file.originalname,
      url: result.secure_url
    });
    newFile.save();
    
    // Remove the temporary file
    // fs.unlinkSync(tempFilePath);

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.use('/schools', schoolRoutes );
app.use('/contacts', contactRoutes);
app.use('/users', userRoutes);

app.listen(port,  ()=>{
    console.log('working.......')
})