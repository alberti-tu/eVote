import {describe ,it} from 'mocha';
import {expect} from 'chai';
//import PublicKey from '../src/models/publicKey'
import {PublicKeyOps,PublicKeyModel} from '../../src/models/publicKey'
//import BigNum from 'bignum';
import * as RSA from "../../src/rsaLib"
import mongoose from "mongoose";



describe("test for the publicKey functions",async function(){
    this.timeout("10s");

    before(async function(){
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://localhost:27017/eVoteTable',{ useNewUrlParser: true });
    })

    it("fromRSAPublicKey correctly save",async function(){
        let keys = await RSA.generateKeys(2048);
        let publicKeyPersistent = PublicKeyOps.fromRSAPublicKey(keys.publicKey);
        publicKeyPersistent = await publicKeyPersistent.save();

        let publicKeyPersSaved = await PublicKeyModel.findById(publicKeyPersistent._id);
        expect(publicKeyPersSaved.keyNumber).to.be.equal(keys.publicKey.keyNumber.toString(16));
        expect(publicKeyPersSaved.mod).to.be.equal(keys.publicKey.mod.toString(16));
    })
    it("toRSAPublicKey correctly transform",async function(){
        let testKey = new PublicKeyModel();
        testKey.keyNumber = "ffffff";
        testKey.mod = "aaaaaa";
        testKey = await testKey.save();
        let savedTestKey = await PublicKeyModel.findById(testKey._id);
        let usefulKey :RSA.PublicKey = PublicKeyOps.toRSAPublicKey(savedTestKey);
        expect(usefulKey.keyNumber.toString(16)).to.be.equal(testKey.keyNumber);
        expect(usefulKey.mod.toString(16)).to.be.equal(testKey.mod);

    })

    afterEach(async function(){
        await PublicKeyModel.deleteMany({});
    })

    after(async function(){
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close();
    })
})