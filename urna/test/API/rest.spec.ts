import {describe} from 'mocha';
import {expect} from 'chai';
import chai = require('chai');
import chaiHttp = require('chai-http');
import * as RSA from "../../src/rsaLib"
import mongoose from "mongoose";
//import PublicKey from '../../src/models/publicKey';
//import PrivateKeyPart from '../../src/models/privateKeyPart';
//import Crypto from "crypto";
import {step} from 'mocha-steps';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import app from '../../app'
import { BallotBoxTableModel } from '../../src/models/Table';
import Vote, { firmVote } from '../../src/models/vote';
import BigNum from 'bignum';


chai.use(chaiHttp);

describe('a test voting',async function(){
    this.timeout("10s");
    let electionsKeys:RSA.PrivateKey;
    let tableKey:RSA.PublicKey;

    before(async function(){
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://localhost:27017/eVoteTable',{ useNewUrlParser: true });
        electionsKeys = await RSA.generateKeys(1024);
    })

    step('admin create new table',async function(){
        const res = await chai.request(app).post('/admin/newTable').send({
            electionsKey:{
                keyNumber:electionsKeys.publicKey.keyNumber.toString(16),
                mod:electionsKeys.publicKey.mod.toString(16),
            },
            candidates:['PP','PSOE','VOX','CIUTADANS','PODEMOS'],
            tableId:'eleccions2019'
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(0);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
        //console.log("mod",res.body.publicKeyMod);
        //console.log("keyNumber",res.body.publicKey);
    })

    step('getTableInfo',async function(){
        const res = await chai.request(app).post('/admin/eleccions2019/tableInfo').send({
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(0);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
        tableKey = new RSA.PublicKey();
        tableKey.mod = new BigNum(res.body.publicKeyMod,16)
        tableKey.keyNumber = new BigNum(res.body.publicKey,16)
    })

    step('split',async function(){
        const res = await chai.request(app).post('/admin/eleccions2019/split').send({
            parts:10,
            threshold:5
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(1);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
    })

    let part1:string;
    let part2:string;
    let part3:string;
    let part4:string;
    let part5:string;
    let part6:string;

    step('popPart',async function(){
        const res = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        part1 = res.body.part; 
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(2);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);

        const res1 = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        part2 = res1.body.part; 
        expect(res1.body.tableID).to.be.equal('eleccions2019');
        expect(res1.body.state).to.be.equal(2);

        const res2 = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        part3 = res2.body.part; 
        expect(res2.body.tableID).to.be.equal('eleccions2019');
        expect(res2.body.state).to.be.equal(2);

        const res3 = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        part4 = res3.body.part; 
        expect(res3.body.tableID).to.be.equal('eleccions2019');
        expect(res3.body.state).to.be.equal(2);

        const res4 = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        part5 = res4.body.part; 
        expect(res4.body.tableID).to.be.equal('eleccions2019');
        expect(res4.body.state).to.be.equal(2);

        const res5 = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        part6 = res5.body.part; 
        expect(res5.body.tableID).to.be.equal('eleccions2019');
        expect(res5.body.state).to.be.equal(2);
        
        let re = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        expect(re.body.tableID).to.be.equal('eleccions2019');
        expect(re.body.state).to.be.equal(2);

        re = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        expect(re.body.tableID).to.be.equal('eleccions2019');
        expect(re.body.state).to.be.equal(2);

        re = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        expect(re.body.tableID).to.be.equal('eleccions2019');
        expect(re.body.state).to.be.equal(2);

        re = await chai.request(app).post('/admin/eleccions2019/popPart').send({
        })
        expect(re.body.tableID).to.be.equal('eleccions2019');
        expect(re.body.state).to.be.equal(3);
    })

    step('startVote',async function(){
        const res = await chai.request(app).post('/admin/eleccions2019/startVote').send({
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(4);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
    })

    step('addVote',async function(){
        let vote = new Vote();
        vote.vote = '1;0;0;0;0';
        firmVote(vote,tableKey,await RSA.generateKeys(1024),electionsKeys)
        const res = await chai.request(app).post('/user/eleccions2019').send({
            vote:vote.vote,
            firmIdentity:vote.firmIdentity,
            firmVote:vote.firmVote,
            identity:vote.identity
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(4);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);

        vote = new Vote();
        vote.vote = '0;1;0;0;0';
        firmVote(vote,tableKey,await RSA.generateKeys(1024),electionsKeys)
        await chai.request(app).post('/user/eleccions2019').send({
            vote:vote.vote,
            firmIdentity:vote.firmIdentity,
            firmVote:vote.firmVote,
            identity:vote.identity
        })

        vote = new Vote();
        vote.vote = '0;0;0;0;1';
        firmVote(vote,tableKey,await RSA.generateKeys(1024),electionsKeys)
        await chai.request(app).post('/user/eleccions2019').send({
            vote:vote.vote,
            firmIdentity:vote.firmIdentity,
            firmVote:vote.firmVote,
            identity:vote.identity
        })
    })

    step('stopVote',async function(){
        const res = await chai.request(app).post('/admin/eleccions2019/stopVote').send({
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(5);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
    })

    step('pushPart',async function(){
        let res = await chai.request(app).post('/admin/eleccions2019/pushPart').send({
            part:part1
        })
        expect(res.body.state).to.be.equal(5);
        res = await chai.request(app).post('/admin/eleccions2019/pushPart').send({
            part:part2
        })
        res = await chai.request(app).post('/admin/eleccions2019/pushPart').send({
            part:part3
        })
        res = await chai.request(app).post('/admin/eleccions2019/pushPart').send({
            part:part4
        })
        res = await chai.request(app).post('/admin/eleccions2019/pushPart').send({
            part:part5
        })
        res = await chai.request(app).post('/admin/eleccions2019/pushPart').send({
            part:part6
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(6);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
    })

    step('recoverKey',async function(){
        let res = await chai.request(app).post('/admin/eleccions2019/recoverKey').send({
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(7);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
    })

    step('results',async function(){
        let res = await chai.request(app).post('/admin/eleccions2019/result').send({
        })
        expect(res.body.tableID).to.be.equal('eleccions2019');
        expect(res.body.state).to.be.equal(8);
        expect(res.body.candidates[0]).to.be.equal('PP');
        expect(res.body.candidates[1]).to.be.equal('PSOE');
        expect(res.body.candidates[2]).to.be.equal('VOX');
        expect(res.body.candidates[3]).to.be.equal('CIUTADANS');
        expect(res.body.candidates[4]).to.be.equal('PODEMOS');
        expect(res.body.results[0]).to.be.equal(1);
        expect(res.body.results[1]).to.be.equal(1);
        expect(res.body.results[2]).to.be.equal(0);
        expect(res.body.results[3]).to.be.equal(0);
        expect(res.body.results[4]).to.be.equal(1);
        let ballotBox  = await BallotBoxTableModel.findOne({tableId:'eleccions2019'});
        expect(res.body.publicKeyMod).to.be.equal(ballotBox.tableKey.publicKey.mod);
        expect(res.body.publicKey).to.be.equal(ballotBox.tableKey.publicKey.keyNumber);
    })

    after(async function(){
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close();
    })
})