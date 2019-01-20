import { Injectable } from '@angular/core';
// @ts-ignore
import { Buffer } from 'buffer';
import * as shajs from 'sha.js';
import * as bigInt from 'big-integer';
import { BigInteger } from 'big-integer';
import CryptoJS from 'crypto-js'

@Injectable()
export class CryptographyService {

  public bits: number;
  public _e: BigInteger;             // Client's public exponent
  public _n: BigInteger;             // Client's public modulus
  public _d: BigInteger;             // Client's private key
  public e: BigInteger;              // Server's public exponent
  public n: BigInteger;              // Server's public modulus

  constructor ( bits: number, e: number ) {
    this.bits = bits;
    this._e = bigInt(e);

    this.newKey();
  }

  static primeGenerator(bits: number): BigInteger {
    const max = bigInt(2).pow(bits).subtract(1);
    const min = bigInt(2).pow(bits - 1);

    let prime;
    do {
      prime = bigInt.randBetween(min, max);
    }
    while (prime.isProbablePrime() !== true);

    return prime;
  }

  public newKey() {
    if(this.bits < 256) {
      console.error('ERROR: public modulus very small, more bits are needed');
      return;
    }

    let _p, _q;
    do {
      _p = CryptographyService.primeGenerator(this.bits/2);
      _q = CryptographyService.primeGenerator(this.bits/2);
    } while (_p.multiply(_q) < bigInt(2).pow(this.bits).divide(2));

    // phi = (p-1)(q-1)
    const phi = _p.subtract(1).multiply( _q.subtract(1) );

    this._n = bigInt(_p).multiply(_q);
    this._d = bigInt(this._e).modInv(phi);

    console.log('Generated RSA keys of ' + this._n.bitLength() + ' bits');
  }

  //Return the public keys
  public sendKeys() {
    return { e: this._e, n: this._n };
  }

  //Set the keys of the another instance
  public setKeys(n, e) {
    this.n = bigInt(n, 16);
    this.e = bigInt(e, 16);

    console.log("Server's keys are correctly configured");
  }

  public encrypt(message: BigInteger): BigInteger {
    return message.modPow(this.e, this.n);
  }

  public decrypt(message: BigInteger): BigInteger {
    return message.modPow(this._d, this._n);
  }

  public sign(message: BigInteger): BigInteger {
    return message.modPow(this._d, this._n);
  }

  public verify(message: BigInteger): BigInteger {
    return message.modPow(this.e, this.n);
  }

  public blindSign(message: BigInteger, password: string): BigInteger {
    const hash1 = shajs('sha256').update(password).digest('hex');
    const hash2 = shajs('sha256').update(hash1).digest('hex');
    const hash3 = shajs('sha256').update(hash2).digest('hex');
    const hash4 = shajs('sha256').update(hash3).digest('hex');

    let k = bigInt(hash4 + hash3 + hash2 + hash1, 16);

    do {
      k = k.add(1);
    } while (bigInt.gcd(k, this.n).toString() != '1');

    return message.multiply( bigInt(k).modPow(this.e, this.n) ).mod(this.n);
  }

  public unBlindSign(message: BigInteger, password: string): BigInteger {
    const hash1 = shajs('sha256').update(password).digest('hex');
    const hash2 = shajs('sha256').update(hash1).digest('hex');
    const hash3 = shajs('sha256').update(hash2).digest('hex');
    const hash4 = shajs('sha256').update(hash3).digest('hex');

    let k = bigInt(hash4 + hash3 + hash2 + hash1, 16);

    do {
      k = k.add(1);
    } while (bigInt.gcd(k, this.n).toString() != '1');

    return message.multiply(k.modInv(this.n)).mod(this.n);
  }

  public encryptAES(message: string, password: string): string {
    return CryptoJS.AES.encrypt(message, password).toString();
  }

  public decryptAES(message: string, password: string): string {
    return CryptoJS.AES.decrypt(message, password).toString();
  }

  public stringToHex(message: string) {
    return Buffer.from(message).toString('hex');
  }

  public hexToString(message: string) {
    return Buffer.from(message, 'hex').toString('ascii');
  }
  public keysToUser() {
    return {
      dm: this._d.toString(16)+ '.' +  this._n.toString(16) ,
      pm: this._e.toString(16) + '.' +  this._n.toString(16)
    };
  }
}
