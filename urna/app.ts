import { newTable, getTableInfo, split, popPart, startVote, stopVote, pushPart, recoverKey, results } from './src/server/admin'
import { addVote, getTables } from './src/server/user'
import {Response,Request} from 'express-serve-static-core';
import cors from 'cors'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/admin/newTable',newTable);
app.post('/admin/:tableId/tableInfo',getTableInfo);
app.post('/admin/:tableId/split',split);
app.post('/admin/:tableId/popPart',popPart);
app.post('/admin/:tableId/startVote',startVote);
app.post('/admin/:tableId/stopVote',stopVote);
app.post('/admin/:tableId/pushPart',pushPart);
app.post('/admin/:tableId/recoverKey',recoverKey)
app.post('/admin/:tableId/result',results)
app.post('/user/:tableId',addVote);
app.get('/user/tables',getTables);

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

app.get('*', (req: Request, res: Response) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`dist/urna/${req.url}`));
    } else {
      res.sendFile(path.resolve('dist/urna/index.html'));
    }
  });


export default app;
