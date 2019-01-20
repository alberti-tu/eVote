const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

mongoose.connect('mongodb://localhost:27017/evote', { useNewUrlParser: true }, function (err, db) {
    if(err) {
        console.error('Database Error: ' + err);
    } else {
        console.log('Database connected...');
        module.exports.db = db;
        app.set('connects', db);
    }
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/keys', routes.takeKeys);

app.post('/rsa', routes.setKeys);                                           // Exchange the public keys to everyone

app.post('/login', bodyParser.json(),routes.login);
app.post('/savePrivate', bodyParser.text(), routes.savePrivate);

app.post('/rsa/id/save', routes.saveIdentity);
app.post('/rsa/id/send', routes.sendIdentity);


const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext)>0).length > 0) {
        res.sendFile(path.resolve(`dist/eVote-client/${req.url}`));

    } else {
        res.sendFile(path.resolve(`dist/eVote-client/index.html`));
    }
});

module.exports = app;
