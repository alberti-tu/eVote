import {describe ,it} from 'mocha';
import {expect} from 'chai';
import {BallotBoxTable, State} from '../../src/models/Table';
import BigNum from 'bignum';
import crypto from 'crypto';
import * as RSA from '../../src/rsaLib'
import Vote, { firmVote } from '../../src/models/vote';
import mongoose from "mongoose";
import {step} from 'mocha-steps';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';


chai.use(chaiAsPromised);



describe("test for the table functions",async function(){
    this.timeout("10s");

    before(async function(){
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://localhost:27017/eVoteTable',{ useNewUrlParser: true });
    })

    it("return true when the vote is correctly formed",async function(){
        let electionKeys = await RSA.generateKeys(1024);
        let table = await BallotBoxTable.newTable(electionKeys.publicKey,"testTable",["user1",'user2','user3','user4','user5']);
        let vote = new Vote();
        //add identity
        let identityKeys = await RSA.generateKeys(1024);
        vote.identity = identityKeys.publicKey.keyNumber.toString(16)+'.'+identityKeys.publicKey.mod.toString(16);
        //add firmIdentity
        const hash = crypto.createHash('sha256');
        hash.update(vote.identity);
        vote.firmIdentity = electionKeys.sign(new BigNum(hash.digest('hex'),16)).toString(16);

        //add vote
        vote.vote = table.publicTableKey.encrypt(BigNum.fromBuffer(Buffer.from("some test vote value"))).toString(16);

        //add firmVote
        const hash2 = crypto.createHash('sha256');
        hash2.update(vote.vote);
        vote.firmVote = identityKeys.sign(new BigNum(hash2.digest('hex'),16)).toString(16);
        expect(table.isCorrectVote(vote)).to.be.equal(true);
    })

    it("return false when the firmIdentity is wrong",async function(){
        let electionKeys = await RSA.generateKeys(1024);
        let table = await BallotBoxTable.newTable(electionKeys.publicKey,"testTable1",["user1",'user2','user3','user4','user5']);
        let vote = new Vote();
        //add identity
        let identityKeys = await RSA.generateKeys(1024);
        vote.identity = identityKeys.publicKey.keyNumber.toString(16)+'.'+identityKeys.publicKey.mod.toString(16);

        vote.firmIdentity = "wrong value"

        //add vote
        vote.vote = table.publicTableKey.encrypt(BigNum.fromBuffer(Buffer.from("some test vote value"))).toString(16);

        //add firmVote
        const hash2 = crypto.createHash('sha256');
        hash2.update(vote.vote);
        vote.firmVote = identityKeys.sign(new BigNum(hash2.digest('hex'),16)).toString(16);
        expect(table.isCorrectVote(vote)).to.be.equal(false);
    })

    it("return false when the vote identity is wrong",async function(){
        let electionKeys = await RSA.generateKeys(1024);
        let table = await BallotBoxTable.newTable(electionKeys.publicKey,"testTable2",["user1",'user2','user3','user4','user5']);
        let vote = new Vote();
        //add identity
        let identityKeys = await RSA.generateKeys(1024);
        vote.identity = "identityKeys.publicKey.keyNumber.toString(16)+'.'+identityKeys.publicKey.mod.toString(16)";
        //add firmIdentity
        const hash = crypto.createHash('sha256');
        hash.update(vote.identity);
        vote.firmIdentity = electionKeys.sign(new BigNum(hash.digest('hex'),16)).toString(16);

        //add vote
        vote.vote = table.publicTableKey.encrypt(BigNum.fromBuffer(Buffer.from("some test vote value"))).toString(16);

        //add firmVote
        const hash2 = crypto.createHash('sha256');
        hash2.update(vote.vote);
        vote.firmVote = identityKeys.sign(new BigNum(hash2.digest('hex'),16)).toString(16);
        expect(table.isCorrectVote(vote)).to.be.equal(false);
    })

    it("return false when the firmVote is wrong",async function(){
        let electionKeys = await RSA.generateKeys(1024);
        let table = await BallotBoxTable.newTable(electionKeys.publicKey,"testTable3",["user1",'user2','user3','user4','user5']);
        let vote = new Vote();
        //add identity
        let identityKeys = await RSA.generateKeys(1024);
        vote.identity = identityKeys.publicKey.keyNumber.toString(16)+'.'+identityKeys.publicKey.mod.toString(16);
        //add firmIdentity
        const hash = crypto.createHash('sha256');
        hash.update(vote.identity);
        vote.firmIdentity = electionKeys.sign(new BigNum(hash.digest('hex'),16)).toString(16);

        //add vote
        vote.vote = table.publicTableKey.encrypt(BigNum.fromBuffer(Buffer.from("some test vote value"))).toString(16);

        //add firmVote

        vote.firmVote = "wrong"
        expect(table.isCorrectVote(vote)).to.be.equal(false);
    })

    it("create test electionKey and certificate",async function(){
        let electionKeys = await RSA.generateKeys(1024);
        console.log(JSON.stringify({keyNumber:electionKeys.publicKey.keyNumber.toString(16),mod:electionKeys.publicKey.mod.toString(16)}));
        let identity = await RSA.generateKeys(1024);
        let publicIdentity = identity.publicKey.keyNumber.toString(16)+'.'+identity.publicKey.mod.toString(16);
        let privateIdentity = identity.keyNumber.toString(16)+'.'+identity.mod.toString(16);
        let hash = crypto.createHash('sha256');
        hash.update(publicIdentity);
        let firmIdentity = electionKeys.sign(new BigNum(hash.digest('hex'),16)).toString(16);
        console.log(JSON.stringify({
            privateIdentity,
            publicIdentity,
            firmIdentity
        }));
        let identity2 = await RSA.generateKeys(1024);
        publicIdentity = identity2.publicKey.keyNumber.toString(16)+'.'+identity2.publicKey.mod.toString(16);
        privateIdentity = identity2.keyNumber.toString(16)+'.'+identity2.mod.toString(16);
        hash = crypto.createHash('sha256');
        hash.update(publicIdentity);
        firmIdentity = electionKeys.sign(new BigNum(hash.digest('hex'),16)).toString(16);
        console.log(JSON.stringify({
            privateIdentity,
            publicIdentity,
            firmIdentity
        }));
        let identity3 = await RSA.generateKeys(1024);
        publicIdentity = identity3.publicKey.keyNumber.toString(16)+'.'+identity3.publicKey.mod.toString(16);
        privateIdentity = identity3.keyNumber.toString(16)+'.'+identity3.mod.toString(16);
        hash = crypto.createHash('sha256');
        hash.update(publicIdentity);
        firmIdentity = electionKeys.sign(new BigNum(hash.digest('hex'),16)).toString(16);
        console.log(JSON.stringify({
            privateIdentity,
            publicIdentity,
            firmIdentity
        }));

        let identity4 = await RSA.generateKeys(1024);
        publicIdentity = identity4.publicKey.keyNumber.toString(16)+'.'+identity4.publicKey.mod.toString(16);
        privateIdentity = identity4.keyNumber.toString(16)+'.'+identity4.mod.toString(16);
        hash = crypto.createHash('sha256');
        hash.update(publicIdentity);
        firmIdentity = electionKeys.sign(new BigNum(hash.digest('hex'),16)).toString(16);
        console.log(JSON.stringify({
            privateIdentity,
            publicIdentity,
            firmIdentity
        }));
    })

    describe("a use case test",async function(){
        let electionKeys:RSA.PrivateKey;
        let table:BallotBoxTable;
        step('create table',async function(){
            electionKeys = await RSA.generateKeys(1024);
            table = await BallotBoxTable.newTable(electionKeys.publicKey,'test22',[
                "user1",
                'user2',
                'user3',
                'user4',
                'user5',
                'user6',
                'user7',
                'user8',
                'user9',
                'user10',
                'user11'
            ]);
            expect(table).to.not.be.an('undefined');
            expect(table.popPart()).to.eventually.rejectedWith(Error,'The table key is not split');
            expect(table.startVote()).to.eventually.rejectedWith(Error,'before the vote is needed split the key');
            expect(table.addVote(undefined)).to.eventually.rejectedWith(Error,'before the vote you need start the voting');
            expect(table.stopVote()).to.eventually.rejectedWith(Error,'to stop the voting is need to be started');
            expect(table.pushPart(undefined)).to.eventually.rejectedWith(Error,'you need to to stop the voting before you push part');
        })

        step('split the key',async function(){
            expect(table.popPart()).to.eventually.rejectedWith(Error,'The table key is not split');
            expect(table.startVote()).to.eventually.rejectedWith(Error,'before the vote is needed split the key');
            expect(table.addVote(undefined)).to.eventually.rejectedWith(Error,'before the vote you need start the voting');
            expect(table.stopVote()).to.eventually.rejectedWith(Error,'to stop the voting is need to be started');
            expect(table.pushPart(undefined)).to.eventually.rejectedWith(Error,'you need to to stop the voting before you push part');

            await table.split(10,5);
            expect(table.privateTableKey).to.be.equal(undefined);
            let tablePers = await table.tablePer();
            expect(tablePers.tableId).to.be.equal('test22');
            expect(tablePers.state).to.be.equal(State.split);
            expect(tablePers.tableKey.parts.length).to.be.equal(10);
            expect(tablePers.tableKey.threshold).to.be.equal(5);
        })
        let part0:string;
        let part1:string;
        let part2:string;
        let part3:string;
        let part4:string;
        let part5:string;
        let part6:string;
        let part7:string;
        let part8:string;
        let part9:string;

        step('pop part of the key',async function(){
            expect(table.startVote()).to.eventually.rejectedWith(Error,'before the vote is needed split the key');
            expect(table.addVote(undefined)).to.eventually.rejectedWith(Error,'before the vote you need start the voting');
            expect(table.stopVote()).to.eventually.rejectedWith(Error,'to stop the voting is need to be started');
            expect(table.pushPart(undefined)).to.eventually.rejectedWith(Error,'you need to to stop the voting before you push part');

            part0 = await table.popPart();
            expect(table.ballotBoxPers.state).to.be.equal(State.shareKey);
            expect(table.ballotBoxPers.tableId).to.be.equal('test22');
            expect(table.ballotBoxPers.tableKey.parts.length).to.be.equal(10);
            expect(table.ballotBoxPers.tableKey.threshold).to.be.equal(5);
            expect(table.ballotBoxPers.tableKey.parts[0].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[0].value).to.not.be.equal(part0);

            part1 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[1].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[1].value).to.not.be.equal(part1);

            part2 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[2].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[2].value).to.not.be.equal(part2);

            part3 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[3].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[3].value).to.not.be.equal(part3);

            part4 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[4].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[4].value).to.not.be.equal(part4);

            part5 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[5].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[5].value).to.not.be.equal(part5);

            part6 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[6].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[6].value).to.not.be.equal(part6);

            part7 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[7].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[7].value).to.not.be.equal(part7);

            part8 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[8].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[8].value).to.not.be.equal(part8);

            part9 = await table.popPart();
            expect(table.ballotBoxPers.tableKey.parts[9].isHash).to.be.equal(true);
            expect(table.ballotBoxPers.tableKey.parts[9].value).to.not.be.equal(part9);
        })

        step('start the voting',async function(){
            expect(table.addVote(undefined)).to.eventually.rejectedWith(Error,'before the vote you need start the voting');
            expect(table.stopVote()).to.eventually.rejectedWith(Error,'to stop the voting is need to be started');
            expect(table.pushPart(undefined)).to.eventually.rejectedWith(Error,'you need to to stop the voting before you push part');

            await table.startVote();
            expect(table.ballotBoxPers.state).to.be.equal(State.vote);
            expect(table.ballotBoxPers.tableId).to.be.equal('test22');
            expect(table.ballotBoxPers.tableKey.parts.length).to.be.equal(10);
            expect(table.ballotBoxPers.tableKey.threshold).to.be.equal(5);
        })
        
        step('add votes',async function(){
            expect(table.pushPart(undefined)).to.eventually.rejectedWith(Error,'you need to to stop the voting before you push part');

            let vote:Vote = new Vote();
            vote.vote = "0;0;0;0;0;1;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(1);

            vote = new Vote();
            vote.vote = "0;0;0;0;0;1;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            vote.identity = "000000";
            try{
                await table.addVote(vote);
            }catch(err){}

            vote = new Vote();
            vote.vote = "0;0;0;0;0;1;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            vote.firmVote = "000000";
            try{
                await table.addVote(vote);
            }catch(err){}
            expect(table.ballotBoxPers.votes.length).to.be.equal(1);

            vote = new Vote();
            vote.vote = "1;0;0;0;0;0;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(2);

            vote = new Vote();
            vote.vote = "0;1;0;0;0;0;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(3);

            vote = new Vote();
            vote.vote = "0;0;1;0;0;0;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            await table.addVote(vote);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(4);

            vote = new Vote();
            vote.vote = "0;0;0;1;0;0;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(5);

            vote = new Vote();
            vote.vote = "0;0;0;0;1;0;0;0;0;0;0"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(6);

            vote = new Vote();
            vote.vote = "0;0;0;0;0;0;0;0;0;0;1"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(7);
            vote = new Vote();
            vote.vote = "0;0;0;0;0;0;0;0;0;0;1"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(8);
            vote = new Vote();
            vote.vote = "0;0;0;0;0;0;0;0;0;0;1"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(9);
            vote = new Vote();
            vote.vote = "0;0;0;0;0;0;0;0;0;0;1"
            firmVote(vote,table.publicTableKey,await RSA.generateKeys(1024),electionKeys);
            await table.addVote(vote);
            expect(table.ballotBoxPers.votes.length).to.be.equal(10);
        })

        step('stop the voting',async function(){
            expect(table.pushPart(undefined)).to.eventually.rejectedWith(Error,'you need to to stop the voting before you push part');

            await table.stopVote();
            expect(table.ballotBoxPers.state).to.be.equal(State.recoverParts);
            expect(table.ballotBoxPers.tableId).to.be.equal('test22');
        })

        step('push parts for recover the keys',async function(){
            await table.pushPart(part0);
            expect(table.ballotBoxPers.tableKey.parts[0].isHash).to.be.equal(false);
            expect(table.ballotBoxPers.tableKey.parts[0].value).to.be.equal(part0);

            await table.pushPart(part1);
            expect(table.ballotBoxPers.tableKey.parts[1].isHash).to.be.equal(false);
            expect(table.ballotBoxPers.tableKey.parts[1].value).to.be.equal(part1);

            await table.pushPart(part2);
            expect(table.ballotBoxPers.tableKey.parts[2].isHash).to.be.equal(false);
            expect(table.ballotBoxPers.tableKey.parts[2].value).to.be.equal(part2);

            await table.pushPart(part3);
            expect(table.ballotBoxPers.tableKey.parts[3].isHash).to.be.equal(false);
            expect(table.ballotBoxPers.tableKey.parts[3].value).to.be.equal(part3);

            await table.pushPart(part4);
            expect(table.ballotBoxPers.tableKey.parts[4].isHash).to.be.equal(false);
            expect(table.ballotBoxPers.tableKey.parts[4].value).to.be.equal(part4);

            await table.pushPart(part5);
            expect(table.ballotBoxPers.tableKey.parts[5].isHash).to.be.equal(false);
            expect(table.ballotBoxPers.tableKey.parts[5].value).to.be.equal(part5);
        })
        step('recover the key',async function(){
            await table.recoverKey();
            expect(table.ballotBoxPers.state).to.be.equal(State.recoverKey);
            expect(table.privateTableKey).to.not.be.equal(undefined);
            expect(table.ballotBoxPers.tableKey.parts.length).to.be.equal(0);
        })

        step('get the results',async function(){
            let results = await table.getResults();
            expect(results[0]).to.be.equal(1);
            expect(results[1]).to.be.equal(1);
            expect(results[2]).to.be.equal(1);
            expect(results[3]).to.be.equal(1);
            expect(results[4]).to.be.equal(1);
            expect(results[5]).to.be.equal(1);
            expect(results[6]).to.be.equal(0);
            expect(results[7]).to.be.equal(0);
            expect(results[8]).to.be.equal(0);
            expect(results[9]).to.be.equal(0);
            expect(results[10]).to.be.equal(4);
        })
    })

    after(async function(){
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close();
    })
})