import { Typegoose, prop } from "typegoose";
import * as RSA from "../rsaLib"
import BigNum from "bignum"


export default class PublicKey extends Typegoose{

    @prop()keyNumber:string;

    @prop()mod:string;

    

}

export const PublicKeyModel = new PublicKey().getModelForClass(PublicKey);

export class PublicKeyOps{
    static toRSAPublicKey(publicKey:PublicKey):RSA.PublicKey{
        let pubKey = new RSA.PublicKey();
        pubKey.keyNumber = new BigNum(publicKey.keyNumber,16);
        pubKey.mod = new BigNum(publicKey.mod,16);
        return pubKey;
    }

    static fromRSAPublicKey(publicKey:RSA.PublicKey){
        let pubKey = new PublicKeyModel();
        pubKey.keyNumber = publicKey.keyNumber.toString(16);
        pubKey.mod = publicKey.mod.toString(16);
        return pubKey;
    }

}