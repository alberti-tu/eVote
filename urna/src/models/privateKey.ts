import { Typegoose, prop, arrayProp} from "typegoose";
import PrivateKeyPart from "./privateKeyPart";
import PublicKey from "./publicKey";
import BigNum from "bignum"
import * as RSA from "../rsaLib";
import Crypto from "crypto";
const sss = require('shamirs-secret-sharing');

export default class PrivateKey extends Typegoose{

    @prop()
    keyNumber:string;

    @prop()
    mod:string;

    @arrayProp({items:PrivateKeyPart})
    parts:PrivateKeyPart[];

    @prop()
    publicKey?:PublicKey;

    @prop()
    threshold:number;


}

export const PrivateKeyModel = new PrivateKey().getModelForClass(PrivateKey);

export class PrivateKeyOps{

    static split(key:PrivateKey,parts:number,threshold:number){
        if(key.keyNumber != undefined)
        {
            const shares = sss.split(key.keyNumber, { shares: parts, threshold: threshold }) as Buffer[];
            key.keyNumber = undefined;
            key.threshold = threshold;
            key.parts = [];
            for(let part of shares){
                let privateKeyPart = new PrivateKeyPart();
                privateKeyPart.isHash = false;
                privateKeyPart.value = part.toString('hex');
                key.parts.push(privateKeyPart);
            }
        }else{
            throw new Error("missing private Key value");
        }
    }

    static combine(key:PrivateKey){
        if(key.parts!=undefined&&key.parts.length>0){
            let count = 0;
            let parts:Buffer[] = [];
            for(let part of key.parts){
                if(part.isHash!=true){
                    count++;
                    parts.push(Buffer.from(part.value,'hex'));
                }
            }
            if(count<key.threshold)throw new Error("missing parts"); 
            let keyNumber = sss.combine(parts) as Buffer;
            key.keyNumber = keyNumber.toString();
            key.parts = [];
            key.threshold = undefined;

        }else{
            throw new Error("the privateKey is not split");
        }
    }

    static popPart(key:PrivateKey):string|undefined{
        if(key.parts!=undefined&&key.parts.length>0){
            for(let part of key.parts){
                if(part.isHash!=true){
                    let keyPart = part.value;
                    const hash = Crypto.createHash('sha256');
                    hash.update(part.value);
                    part.value = hash.digest('hex');
                    part.isHash = true;
                    return keyPart;
                }
            }
            return undefined;
        }else{
            throw new Error("the privateKey is not split");
        }
    }

    static recoverPart(key:PrivateKey,partValue:string){
        if(key.parts!=undefined&&key.parts.length>0){
            const hash = Crypto.createHash('sha256');
            hash.update(partValue);
            let partHash = hash.digest('hex');

            for(let part of key.parts){
                if(part.isHash==true&&partHash===part.value){
                    part.value = partValue;
                    part.isHash = false;
                    return;
                }
            }
            throw new Error("this part is not correct");
        }else{
            throw new Error("the privateKey is not split");
        }
    }

    static toRSAPrivateKey(key:PrivateKey):RSA.PrivateKey{
        if(key.parts==undefined||key.parts.length==0)
        {
            let privateKey = new RSA.PrivateKey();
            privateKey.keyNumber = new BigNum(key.keyNumber,16);
            privateKey.mod = new BigNum(key.mod,16);
            if(key.publicKey!=undefined){
                privateKey.publicKey = new RSA.PublicKey();
                privateKey.publicKey.mod = new BigNum(key.publicKey.mod,16);
                privateKey.publicKey.keyNumber = new BigNum(key.publicKey.keyNumber,16);
            }
            return privateKey;
        }
        throw new Error("the privateKey is split");
    }

    static fromRSAPrivateKey(privateKey:RSA.PrivateKey){
        let privKey = new PrivateKeyModel();
        privKey.keyNumber = privateKey.keyNumber.toString(16);
        privKey.mod = privateKey.mod.toString(16);
    
        if(privateKey.publicKey!=undefined){
            let pubKey = new PublicKey();
            pubKey.keyNumber = privateKey.publicKey.keyNumber.toString(16);
            pubKey.mod = privateKey.publicKey.mod.toString(16);
            privKey.publicKey = pubKey;
        }
    
        return privKey;
    }
}