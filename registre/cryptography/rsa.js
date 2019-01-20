//const bignum = require('bignum');
'use strict';

//import {modInv, modPow, toZn} from "./modArith";

const modArith = require('./modArith');
const crypto = require('crypto');

const primes = require('./primeNrandoms');


const RSA = class RSA {

    constructor (bits = 200, _e = 65537, _n=123, _d=123) {
        this.bits = bits;
        this._e = BigInt('0x'+_e); //la tuya
        this._n = BigInt('0x'+_n);
        this._d = BigInt('0x'+_d);
        this.e = 0n; //servidor
        this.n = 0n;
        //this.newKey();
    }

    // Generate a new set of RSA keys
    newKey() {
        if(this.bits < 50) {
            console.error('ERROR: public modulus very small, more bits are needed');
            process.exit(0);
        }


        let p = primes.prime(this.bits/2,41,true);
        let q = primes.prime(this.bits/2,41,true);

        // phi = (p-1)(q-1)
        let phi = (p-1n)*(q-1n);

        //this._e = this._e.toString();
        this._n = p*q;

        this._d = modArith.modInv(this._e, BigInt(phi));

        if ( modArith.toZn(this._e*this._d,phi)!== 1n) {
            console.error('ERROR: Failed to generate the RSA keys');
            process.exit(0);
        } else {
            console.log('Generated RSA keys of ' + this.bits + ' bits');
        }
    }

    // Return the public keys and set the keys of the another instance
    setKeys(n = this.n, e = this.e) {
        this.e = BigInt(e);
        this.n = BigInt(n);
        return { e: this._e.toString(16), n: this._n.toString(16) };
    }

    encrypt(message) {
        return modArith.modPow(message,this.e,this.n);                       // Encrypt the message
    };

    decrypt(message) {
        return modArith.modPow(message,this._d,this._n);         // Decrypt the message
    };

    sign(message) {
        return modArith.modPow(BigInt('0x' + message),this._d,this._n);              // Sign the message
    };

    verify(message) {
        return modArith.modPow(BigInt('0x'+ message),this.e,this.n);
    };
};

module.exports = {
    RSA: RSA
};

//Como hacer un HASH
//let digest = crypto.createHash('sha256').update(message.toString()).digest('hex');         // Digest of the message
