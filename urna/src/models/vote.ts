import {Typegoose,prop} from 'typegoose';
import * as RSA from '../rsaLib'
import BigNum from 'bignum';
import crypto from 'crypto';



export default class Vote extends Typegoose{
    @prop()
    vote:string;//encriptat amb la clau publica de la taula electoral

    @prop()
    firmVote:string;//hash sha256 de 'vote' firmat per la clau privada de la identitat

    @prop()
    identity:string;//clau publica de la identitat amb el format keynumber.mod

    @prop()
    firmIdentity:string;//hash sha256 de 'identity' firmat amb la clau privada de les eleccions
}

export function firmVote(vote:Vote,table:RSA.PublicKey,identity:RSA.PrivateKey,electionsKey:RSA.PrivateKey):Vote{
    vote.identity = identity.publicKey.keyNumber.toString(16)+'.'+identity.publicKey.mod.toString(16);
    const hash = crypto.createHash('sha256');
    hash.update(vote.identity);
    vote.firmIdentity = electionsKey.sign(new BigNum(hash.digest('hex'),16)).toString(16);
    vote.vote = table.encrypt(BigNum.fromBuffer(Buffer.from(vote.vote))).toString(16);
    const hash2 = crypto.createHash('sha256');
    hash2.update(vote.vote);
    vote.firmVote = identity.sign(new BigNum(hash2.digest('hex'),16)).toString(16);
    return vote;
}

