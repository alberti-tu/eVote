import app from '../app';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';

const options = {
    key: fs.readFileSync(__dirname+'/../keys/server.key'),
    cert: fs.readFileSync(__dirname+'/../keys/server.cert')
};

if(process.env.MONGO)
    mongoose.connect('mongodb://'+process.env.MONGO+':27017/eVoteBallet',{ useNewUrlParser: true });
else
    mongoose.connect('mongodb://localhost:27017/eVoteBallet',{ useNewUrlParser: true });

https.createServer(options, app).listen(8080);