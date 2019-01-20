const assert = require('chai').assert;
const crypto = require('crypto');
const security = require('../cryptography/rsa');

describe('RSA tests: ', function () {

    let bits = 1000;
    let message = 2000n;

    let a = new security.RSA(bits);
    let b = new security.RSA(bits);

    a.setKeys( b.setKeys().n, b.setKeys().e );
    b.setKeys( a.setKeys().n, a.setKeys().e );

    //console.log(a);

    let encrypt = a.encrypt(message);
    let decrypt = b.decrypt(encrypt);


    let digest = crypto.createHash('sha256').update(message.toString()).digest('hex');
    let sign = a.sign(message);
    let verify = b.verify(message, sign);

    describe('Encryption: ', function () {
      //  it('crypto has the same bit lenght than public modulus', function () { assert.equal(encrypt.length * 4, bits) });
        it('message is different than crypto', function () { assert.notEqual(encrypt, message) });
    });

    describe('Decryption: ', function () {
        it('msg has the same bit lenght than message', function () { assert.equal(decrypt.length, message.length) });
        it('message is equal to msg', function () { assert.equal(decrypt, message) });
    });

    describe('Hash: ', function() {
        it('digest has 256 bits', function () { assert.equal(digest.length * 4, 256) });
        it('message is different than hash', function() { assert.notEqual(digest, message) });
    });

    describe('Sign: ', function() {
        //it('sign has the same bit lenght than public modulus', function () { assert.equal(sign.length * 4, bits) });
        it('message is different than sign', function() { assert.notEqual(sign, message) });
    });

    describe('Verify: ', function() {
        it('verification has 256 bits', function () { assert.equal(digest.length * 4, 256) });
        it('source verified', function() { assert.equal(verify, true) });
    });
});