import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptographyService } from '../Cryptography/cryptography.service';
import { User } from "../../models/user";
import * as bigInt from 'big-integer';
import * as shajs from 'sha.js'


@Injectable()
export class HttpClientService {

  private url: string = 'https://localhost:3000';
  private token: string;
  private security: CryptographyService;
  private keys = { n: '', e: ''};

  constructor( private http: HttpClient ) {
     this.security = new CryptographyService(512, 65537);    // Generates the RSA keys
     // this.setKeys();                                         // Exchange the RSA keys with the server
      this.test();
    this.takeKeys();
  }

  public login(user: User) {
    return this.http.post<any>(this.url + '/login', user);
  }

  public setToken(token: string) {
    this.token = token;
  }

  public async takeKeys() {
    this.http.get<any>(this.url + '/keys').subscribe(value => {
      this.keys = value;
      this.security.setKeys(this.keys.n, this.keys.e);
    });
  }

  public async setKeys(): Promise <{dm: string, pm: string}> {
    // this.security = new CryptographyService(1024, 65537);    // Generates the RSA keys

    this.http.post<any>(this.url + '/rsa', await this.security.sendKeys() ).subscribe(value => {
      this.keys = value;
      console.log('clavees', this.keys);
      this.security.setKeys(this.keys.n, this.keys.e);
    });
    return this.security.keysToUser();
  }

  public sendIdentity(password: string) {
    const publicKey = this.security._e.toString(16) + '.' + this.security._n.toString(16);
    const privateKey = this.security._d.toString(16) + '.' + this.security._n.toString(16);

    const message = shajs('sha256').update(publicKey).digest('hex');

    const body = {
      publicKey: publicKey,
      AESprivateKey: this.security.encryptAES(privateKey, password),
      identity: this.security.blindSign( bigInt(message, 16), password ).toString(16),
      token: this.token
    };

    return this.http.post<any>(this.url + '/rsa/id/save', body)
  }

  public recieveIdentity(password: string) {
    this.http.post<any>(this.url + '/rsa/id/save', { token: this.token }).subscribe(response =>{
      const publicKey  = response.body.publicKey.split('.');
      const privateKey = this.security.decryptAES(response.body.AESprivateKey, password).split('.');

      // Set the Client's Keys
      this.security._e = bigInt(publicKey[0], 16);
      this.security._n = bigInt(publicKey[1], 16);
      this.security._d = bigInt(privateKey[0],16);

      //unblind ID
      return this.security.unBlindSign( bigInt(response.body.identity, 16), password );
    });
  }

  public unblind(message: string, password: string, publicKey){
    if(!publicKey) {
      publicKey = this.security._e.toString(16) + '.' + this.security._n.toString(16);
    }
    console.log(publicKey);
    // const publicKey = this.security._e.toString(16) + '.' + this.security._n.toString(16);
    const hash = shajs('sha256').update(publicKey).digest('hex');

    const unblind = this.security.unBlindSign( bigInt(message, 16), password );
    const verify = this.security.verify(unblind).toString(16);
    console.log(hash, verify);
    if(hash === verify) return unblind;
    else return null;
  }

  public decryptAES(message: string, password: string) {
    return this.security.hexToString(this.security.decryptAES(message, password));
  }

  test() {
    console.log('TEST: Blind Sign');

    let client = new CryptographyService(1024, 65537);
    let server = new CryptographyService(1024, 65537);

    client.setKeys( server.sendKeys().n.toString(16), server.sendKeys().e.toString(16) );
    server.setKeys( client.sendKeys().n.toString(16), client.sendKeys().e.toString(16) );

    let message = 'hola';
    console.log('message: ' + message);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let encrypt = client.encrypt( bigInt(client.stringToHex(message), 16) );
    console.log('Encrypt: ' + encrypt.toString(16));

    let decrypt = server.hexToString( server.decrypt(encrypt).toString(16) );
    console.log('Decrypt: ' + decrypt);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log('Clear Sign');

    let sign_clear = server.sign( bigInt( server.stringToHex(message), 16 ) );
    console.log('Sign:    ' + sign_clear.toString(16));

    let verify_clear = client.verify(sign_clear);
    console.log('clear:   ' + client.hexToString( verify_clear.toString(16) ));

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log('Blind Sign');

    let blind = client.blindSign( bigInt( client.stringToHex(message), 16 ), '123' );
    console.log('Blind:   ' + blind.toString(16));

    let sign_blind = server.sign(blind);
    console.log('Sign:    ' + sign_blind.toString(16));

    let unblind = client.unBlindSign( sign_blind, '123' );
    console.log('Unblind: ' + unblind.toString(16));

    let verify_blind = client.hexToString( client.verify(unblind).toString(16) );
    console.log('clear:   ' + verify_blind);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let AES = client.encryptAES('asd213asd', '1234');
    console.log(AES);

    let AES2 = client.hexToString( client.decryptAES(AES, '1234') );
    console.log(AES2);


    const password = '123';
    const publicKey = client._e.toString(16) + '.' + client._n.toString(16);
    const privateKey = client._d.toString(16) + '.' + client._n.toString(16);

    message = shajs('sha256').update(publicKey).digest('hex');

    const body = {
      AESpublicKey: client.encryptAES(publicKey, password),
      AESprivateKey: client.encryptAES(privateKey, password),
      identity: client.blindSign( bigInt(message, 16), password ).toString(16)
    };

    console.log(body);
  }
}





/*
  public encrypt(message: string) {
    let msg = this.security.stringToHex(message);
    let body = this.security.encrypt( bigInt(msg, 16) ).toString(16);
    // @ts-ignore
    return this.http.post<any>(this.url + '/rsa/decrypt', body, {responseType: 'text'});
  }

  public decrypt (message: string): string {
    let msg = this.security.decrypt( bigInt(message, 16) ).toString(16);
    return this.security.hexToString(msg);
  }

  public signEncrypted (message: string) {
    let msg = this.security.stringToHex(message);
    let body = this.security.encrypt( bigInt(msg, 16) ).toString(16) + '.' + this.security.sign( bigInt(msg, 16) ).toString(16);
    // @ts-ignore
    return this.http.post<any>(this.url + '/rsa/decrypt/verify', body, {responseType: 'text'});
  }

  public verifyDecrypted (message: string): boolean {
    let request = message.split('.');

    let msg = this.security.decrypt( bigInt(request[0], 16) ).toString(16);

    let digest = shajs('sha256').update( this.security.hexToString(msg) ).digest('hex');
    let verify = this.security.verify( bigInt(request[1], 16) ).toString(16);

    return digest === verify;
  }

    public sign(message: string) {
    let digest = shajs('sha256').update(message).digest('hex');
    let body = message + '.' + this.security.sign( bigInt(digest, 16) ).toString(16);
    // @ts-ignore
    return this.http.post<any>(this.url + '/rsa/verify', body, {responseType: 'text'});
  }

  public verify(message: string): boolean {
    let request = message.split('.');
    let digest = shajs('sha256').update(request[0]).digest('hex');
    let verify = this.security.verify( bigInt(request[1], 16) ).toString(16);
    return digest === verify;
  }

*/
