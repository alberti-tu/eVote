import {describe ,it} from 'mocha';
import {expect} from 'chai';
//import PublicKey from '../src/models/publicKey'
import {PrivateKeyOps,PrivateKeyModel} from '../../src/models/privateKey'
//import BigNum from 'bignum';
import * as RSA from "../../src/rsaLib"
import mongoose from "mongoose";
import PublicKey from '../../src/models/publicKey';
import PrivateKeyPart from '../../src/models/privateKeyPart';
import Crypto from "crypto";



describe("test for the privateKey functions",async function(){
    this.timeout("10s");

    before(async function(){
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://localhost:27017/eVoteTable',{ useNewUrlParser: true });
    })

    it("fromRSAPrivateKey correctly save",async function(){
        let keys = await RSA.generateKeys(2048);
        let privateKeyPersistent = PrivateKeyOps.fromRSAPrivateKey(keys);
        privateKeyPersistent = await privateKeyPersistent.save();

        let privateKeySaved = await PrivateKeyModel.findById(privateKeyPersistent._id);
        expect(privateKeySaved.publicKey.keyNumber).to.be.equal(keys.publicKey.keyNumber.toString(16));
        expect(privateKeySaved.publicKey.mod).to.be.equal(keys.publicKey.mod.toString(16));
        expect(privateKeySaved.keyNumber).to.be.equal(keys.keyNumber.toString(16));
        expect(privateKeySaved.mod).to.be.equal(keys.mod.toString(16));
    })
    it("toRSAPublicKey correctly transform",async function(){

        let testKey = new PrivateKeyModel();
        testKey.keyNumber = "ffffff";
        testKey.mod = "aaaaaa";
        testKey.publicKey = new PublicKey();
        testKey.publicKey.keyNumber = "bbbbbbbb";
        testKey.publicKey.mod = "cccccccc";
        testKey = await testKey.save();

        let savedTestKey = await PrivateKeyModel.findById(testKey._id);
        let usefulKey :RSA.PrivateKey = PrivateKeyOps.toRSAPrivateKey(savedTestKey);

        expect(usefulKey.keyNumber.toString(16)).to.be.equal(testKey.keyNumber);
        expect(usefulKey.mod.toString(16)).to.be.equal(testKey.mod);
        expect(usefulKey.publicKey.keyNumber.toString(16)).to.be.equal(testKey.publicKey.keyNumber);
        expect(usefulKey.publicKey.mod.toString(16)).to.be.equal(testKey.publicKey.mod);
    })

    it("toRSAPublicKey throws if split",async function(){

        let testKey = new PrivateKeyModel();
        testKey.keyNumber = "ffffff";
        testKey.mod = "aaaaaa";
        testKey.parts = [];
        testKey.parts.push(new PrivateKeyPart())
        testKey.publicKey = new PublicKey();
        testKey.publicKey.keyNumber = "bbbbbbbb";
        testKey.publicKey.mod = "cccccccc";
        testKey = await testKey.save();

        let savedTestKey = await PrivateKeyModel.findById(testKey._id);
        expect(PrivateKeyOps.toRSAPrivateKey.bind(undefined,savedTestKey)).to.throws(Error,"the privateKey is split");
    })

    it("correct split privateKey",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        PrivateKeyOps.split(privateKey,10,5);
        privateKey = await privateKey.save();

        let savedPrivateKey = await PrivateKeyModel.findById(privateKey._id);

        expect(savedPrivateKey.threshold).to.be.equal(5);
        expect(savedPrivateKey.parts.length).to.be.equal(10);
    })

    it("split throw when keyNumber is already split",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        privateKey.keyNumber = undefined;
        expect(PrivateKeyOps.split.bind(undefined,privateKey,10,5)).to.throws(Error,"missing private Key value");
    })

    it("correctly recover privateKey from some parts",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        let tempKeyNumber = privateKey.keyNumber;
        PrivateKeyOps.split(privateKey,10,4);
        for(let x=0;x<5;x++){
            privateKey.parts.pop();
        }
        PrivateKeyOps.combine(privateKey);
        expect(privateKey.keyNumber).to.be.equal(tempKeyNumber);
    })

    it("throws 'missing parts' when not have enough parts",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        PrivateKeyOps.split(privateKey,10,4);
        for(let x=0;x<8;x++){
            privateKey.parts.pop();
        }
        expect(PrivateKeyOps.combine.bind(undefined,privateKey)).to.throws(Error,"missing parts");
    })

    it("throws 'the privateKey is not split' when the private key don't have any part",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        expect(PrivateKeyOps.combine.bind(undefined,privateKey)).to.throws(Error,"the privateKey is not split");
    })

    it("correctly return the part of privateKey",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        PrivateKeyOps.split(privateKey,10,5);
        let tempValue = privateKey.parts[0].value;
        let tempValue2 = PrivateKeyOps.popPart(privateKey);
        expect(tempValue).to.be.equal(tempValue2);

        const hash = Crypto.createHash('sha256');
        hash.update(tempValue);

        let hashValue = hash.digest('hex');
        expect(privateKey.parts[0].value).to.be.equal(hashValue);
        expect(privateKey.parts[0].isHash).to.be.equal(true);
        for(let x=0;x<9;x++){
            PrivateKeyOps.popPart(privateKey);
        }
        expect(PrivateKeyOps.popPart(privateKey)).to.be.equal(undefined);
    })

    it("on popPart throws 'the privateKey is not split' when the private key don't have any part",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        expect(PrivateKeyOps.popPart.bind(undefined,privateKey)).to.throws(Error,"the privateKey is not split");
    })

    it("correctly recoverPart",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        let keyValue = privateKey.keyNumber;
        PrivateKeyOps.split(privateKey,10,10);
        let part = PrivateKeyOps.popPart(privateKey);
        expect(PrivateKeyOps.combine.bind(undefined,privateKey)).to.throws(Error,"missing parts");
        PrivateKeyOps.recoverPart(privateKey,part);
        PrivateKeyOps.combine(privateKey);
        expect(privateKey.keyNumber).to.be.equal(keyValue);
    })

    it("recoverPart throws 'this part is not correct' when is added false part",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        PrivateKeyOps.split(privateKey,10,10);
        PrivateKeyOps.popPart(privateKey);
        expect(PrivateKeyOps.recoverPart.bind(undefined,privateKey,"aaaaaaaaaa")).to.throws(Error,"this part is not correct");
    })

    it("recoverPart throws 'the privateKey is not split' when is not split",async function(){
        let keys = await RSA.generateKeys(1024);
        let privateKey = PrivateKeyOps.fromRSAPrivateKey(keys);
        expect(PrivateKeyOps.recoverPart.bind(undefined,privateKey,"aaaaaaaaaa")).to.throws(Error,"the privateKey is not split");
    })

    afterEach(async function(){
        await PrivateKeyModel.deleteMany({});
    })

    after(async function(){
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close();
    })
})