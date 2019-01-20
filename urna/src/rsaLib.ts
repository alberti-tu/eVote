import  bigNum from 'bignum'
import { randomBytes } from 'crypto';
import hash from 'object-hash';



export function expConMod(base: bigNum, exp: bigNum, mod: bigNum): bigNum {
    return bigNum.powm(base,exp,mod);
}

export async function generateKeys(length:number): Promise<PrivateKey> {
    let result = new PrivateKey();
    let p = await generatePrime(length/2);
    let q = await generatePrime(length/2);
    let phi = bigNum.mul(p.sub(1),q.sub(1))
    let n = bigNum.mul(p,q)
    while(p==q||n.bitLength()!=length||phi.bitLength()!=length){
        p = await generatePrime(length/2);
        q = await generatePrime(length/2);
        phi = bigNum.mul(p.sub(1),q.sub(1))
        n = bigNum.mul(p,q)
    }
    let publicKeyNum = new bigNum('65537');
    result.keyNumber = publicKeyNum.invertm(phi);
    result.mod = n;
    result.phi = phi;
    result.publicKey = new PublicKey();
    result.publicKey.mod = n;
    result.publicKey.keyNumber = publicKeyNum;
    return new Promise<PrivateKey>((value)=>{value(result)});
}

export async function generatePrime(length: number): Promise<bigNum> {
    length = Math.round(length / 8);
    let numberBig = new bigNum(8);

    while (!numberBig.probPrime()==true||numberBig.bitLength()!=length*8) {
        numberBig = bigNum.fromBuffer( await randomBytes(length));
    }
    return new Promise<bigNum>((resolve) => {

        resolve(numberBig)
    });
}

export function messageToBigNum(message:string):bigNum{
    let buffer = new Buffer(message);
    return bigNum.fromBuffer(buffer);
}

export function bigNumToMessage(number:bigNum):string{
    let num = bigNum.sub(number,0);
    return num.toBuffer().toString();
}

export class PublicKey {
    mod: bigNum;
    keyNumber: bigNum;

    encrypt(message:bigNum):bigNum{
        return expConMod(message,this.keyNumber,this.mod);
    }

    verify(message:bigNum):bigNum{
        return expConMod(message,this.keyNumber,this.mod);
    }

    toString():string{
        return this.mod.toString() + "|"+ this.keyNumber.toString();
    }

    toJson(){
        let retJson = {};
        retJson['mod'] = this.mod.toString(10);
        retJson['keyNumber'] = this.keyNumber.toString(10);
        return retJson;
    }
}

export class PrivateKey {
    mod: bigNum;
    keyNumber: bigNum;
    publicKey: PublicKey;
    phi: bigNum;

    decrypt(message:bigNum):bigNum{
        return expConMod(message,this.keyNumber,this.mod);
    }

    sign(message:bigNum):bigNum{
        return expConMod(message,this.keyNumber,this.mod);
    }

    doHash(message:bigNum[]){
        let returnValue = '';
        for(let x=0;x<message.length;x++){
            returnValue += message[x].toString(16);
        }
        return hash(returnValue);
    }

    verifyHash(message:bigNum[],value:string):boolean{
        let returnValue = '';
        for(let x=0;x<message.length;x++){
            returnValue += message[x].toString(16);
        }
        if(hash(returnValue)===value) return true;
        else return false;
    }

    toString():string{
        return this.mod.toString() + "|"+ this.keyNumber.toString();
    }

    toJson(){
        let retJson = {};
        retJson['mod'] = this.mod.toString(10);
        retJson['keyNumber'] = this.keyNumber.toString(10);
        retJson['phi'] = this.phi.toString(10);
        retJson['publicKey'] = this.publicKey.toJson();
        return retJson;
    }
    
}

(async () => {
    generateKeys(1024);
})();
