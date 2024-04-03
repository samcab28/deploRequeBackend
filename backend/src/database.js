const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);
// MongoDB Atlas connection string
const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI :
    'mongodb+srv://reque:123456**..@cluster0.kov0yrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// Connect to MongoDB Atlas
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});
