import { Typegoose, prop,arrayProp } from "typegoose";
import PrivateKey, { PrivateKeyOps } from './privateKey';
import Vote from './vote'
import PublicKey, { PublicKeyOps } from "./publicKey";
import BigNum from "bignum";
import * as RSA from '../rsaLib'
import crypto from 'crypto';

export enum State{
    init = 0,
    split = 1,
    shareKey = 2,
    populatedAllParts =3,
    vote = 4,
    recoverParts = 5,
    recoveredNeededParts = 6,
    recoverKey =7,
    results = 8
}


export default class BallotBoxTablePers extends Typegoose{

    @prop()
    state:number;

    @prop({unique:true})
    tableId:string;

    @prop()
    tableKey:PrivateKey;

    @arrayProp({items:String})
    candidates:string[];

    @arrayProp({items:Vote})
    votes:Vote[];

    @prop()
    electionsKey:PublicKey

}

export const BallotBoxTableModel = new BallotBoxTablePers().getModelForClass(BallotBoxTablePers);

export class BallotBoxTable{
    private constructor(){

    }

    ballotBoxPers:BallotBoxTablePers;

    electionsKey:RSA.PublicKey;

    publicTableKey:RSA.PublicKey;

    privateTableKey?:RSA.PrivateKey;

    static async newTable(electionsKey:RSA.PublicKey,tableId:string,candidates:string[]):Promise<BallotBoxTable>{
        let ballotBoxTable = new BallotBoxTable();
        ballotBoxTable.privateTableKey = await RSA.generateKeys(electionsKey.mod.bitLength());
        ballotBoxTable.ballotBoxPers = new BallotBoxTablePers();
        ballotBoxTable.ballotBoxPers.votes = [];
        ballotBoxTable.ballotBoxPers.state = State.init;
        ballotBoxTable.ballotBoxPers.tableId = tableId;
        ballotBoxTable.ballotBoxPers.candidates = candidates;
        ballotBoxTable.ballotBoxPers.electionsKey = PublicKeyOps.fromRSAPublicKey(electionsKey);
        ballotBoxTable.ballotBoxPers.tableKey = PrivateKeyOps.fromRSAPrivateKey(ballotBoxTable.privateTableKey);
        await ballotBoxTable.save();
        return ballotBoxTable;
    }

    async split(parts:number,threshold:number){
        if(this.ballotBoxPers.state != State.init)throw new Error("table cannot split the key");
        try{
        PrivateKeyOps.split(this.ballotBoxPers.tableKey,parts,threshold);
        //console.log(ballotBoxPers.tableKey);
        }
        catch(err){
            //console.log(err);
            return;
        }
        this.privateTableKey = undefined;
        this.ballotBoxPers.state = State.split;
        await this.save();
    }

    async popPart():Promise<string>{
        if(this.ballotBoxPers.state!=State.split&&this.ballotBoxPers.state!=State.shareKey) throw new Error("The table key is not split");
        try{
            if(this.ballotBoxPers.state==State.split)this.ballotBoxPers.state=State.shareKey;
            let ret =  PrivateKeyOps.popPart(this.ballotBoxPers.tableKey);
            let populatedParts = 0;
            for(let p of this.ballotBoxPers.tableKey.parts){
                if(p.isHash==true)
                populatedParts++;
            }
            if(populatedParts==this.ballotBoxPers.tableKey.parts.length)
                this.ballotBoxPers.state = State.populatedAllParts;
            await this.save();
            return ret;
        }
        catch(err){
            throw new Error('Cannot get private table key');
        }
    }

    async startVote(){
        if(this.ballotBoxPers.state!=State.populatedAllParts) throw new Error("before the vote is needed split the key");
        this.ballotBoxPers.state = State.vote;
        await this.save();
    }

    async addVote(vote:Vote){
        if(this.ballotBoxPers.state!=State.vote) throw new Error("before the vote you need start the voting");
        if(this.isCorrectVote(vote)==false) throw new Error("malformed vote");
        let found = this.ballotBoxPers.votes.find(function(element){
            return element.identity===vote.identity;
        });
        if(found){
            found.vote = vote.vote;
            found.firmVote = vote.firmVote;
        }
        else{
            this.ballotBoxPers.votes.push(vote);
        }
        await this.save();
    }

    async stopVote(){
        if(this.ballotBoxPers.state!=State.vote) throw new Error("to stop the voting is need to be started");
        this.ballotBoxPers.state = State.recoverParts;
        await this.save();
    }

    async pushPart(value:string){
        if(this.ballotBoxPers.state!=State.recoverParts&&
            this.ballotBoxPers.state!=State.recoveredNeededParts) throw new Error("you need to to stop the voting before you push part");
        try{
            PrivateKeyOps.recoverPart(this.ballotBoxPers.tableKey,value);
            let recoveredParts = 0;
            for(let p of this.ballotBoxPers.tableKey.parts){
                if(p.isHash!=true)
                recoveredParts++;
            }
            if(recoveredParts>this.ballotBoxPers.tableKey.threshold)
                this.ballotBoxPers.state = State.recoveredNeededParts;
            await this.save();
        }
        catch(err){
            throw new Error('Cannot recover part from privateKey');
        }
    }

    async recoverKey(){
        if(this.ballotBoxPers.state!=State.recoveredNeededParts) throw new Error("you need push parts after recover the key");
        try{
            PrivateKeyOps.combine(this.ballotBoxPers.tableKey);
            this.ballotBoxPers.state = State.recoverKey;
            await this.save();
        }
        catch(err){
            throw new Error('Cannot recover part from privateKey');
        }
    }

    async getResults():Promise<Array<number>>{
        if(this.ballotBoxPers.state!=State.recoverKey&&this.ballotBoxPers.state!=State.results) throw new Error("the parts of the key is not combined");
        let results:Array<number> = [];
        //console.log(this.ballotBoxPers.candidates.length)
        for(let x=0;x<this.ballotBoxPers.candidates.length;x++){
            results.push(0);
        }
        for(let x=0;x<this.ballotBoxPers.votes.length;x++){
            let vote = this.privateTableKey.decrypt(new BigNum(this.ballotBoxPers.votes[x].vote,16)).toBuffer().toString();
            let parts = vote.split(';');
            for(let y=0;y<parts.length;y++){
                if(parts[y]==='1')results[y]++;
            }
        }
        this.ballotBoxPers.state = State.results;
        await this.save();
        return results;

    }

    isCorrectVote(vote:Vote):boolean{
        //check if the identity was firmed with the elections privateKey
        const hash = crypto.createHash('sha256');
        hash.update(vote.identity);
        let hashValue = hash.digest('hex');
        let hashIdentity = this.electionsKey.verify(new BigNum(vote.firmIdentity,16));
        if(!hashIdentity.eq(new BigNum(hashValue,16))) return false;

        //recover the identity public key
        let identityPubKey = new RSA.PublicKey();
        let keyNumber = vote.identity.split('.')[0];
        let mod = vote.identity.split('.')[1];
        identityPubKey.keyNumber = new BigNum(keyNumber,16);
        identityPubKey.mod = new BigNum(mod,16);

        //create the sha256 of vote
        const hash2 = crypto.createHash('sha256');
        hash2.update(vote.vote);
        let hashVote = hash2.digest('hex');

        //check if the firm of the vote is correct
        let verifiedFirmVote = identityPubKey.verify(new BigNum(vote.firmVote,16));
        if(!verifiedFirmVote.eq(new BigNum(hashVote,16))) return false;
        return true;
    }


    static async loadTable(tableId:string):Promise<BallotBoxTable|undefined>{
        let ballotBoxPers = await BallotBoxTableModel.findOne({tableId:tableId});
        if(!ballotBoxPers) return undefined;

        let ballotBox = new BallotBoxTable();
        ballotBox.ballotBoxPers = new BallotBoxTablePers();
        ballotBox.ballotBoxPers.state = ballotBoxPers.state;
        ballotBox.ballotBoxPers.tableId = ballotBoxPers.tableId;
        ballotBox.electionsKey = PublicKeyOps.toRSAPublicKey(ballotBoxPers.electionsKey);
        if(ballotBoxPers.tableKey.keyNumber!=undefined){
            ballotBox.privateTableKey = PrivateKeyOps.toRSAPrivateKey(ballotBoxPers.tableKey);
        }
        ballotBox.publicTableKey = PublicKeyOps.toRSAPublicKey(ballotBoxPers.tableKey.publicKey);
        ballotBox.ballotBoxPers = ballotBoxPers;
        return ballotBox;
    }

    async tablePer(){
        return BallotBoxTableModel.findOne({tableId:this.ballotBoxPers.tableId});
    }

    async save(){
        let ballotBoxPers = await BallotBoxTableModel.findOne({tableId:this.ballotBoxPers.tableId});
        if(!ballotBoxPers) ballotBoxPers = new BallotBoxTableModel();
        ballotBoxPers.electionsKey = this.ballotBoxPers.electionsKey;
        ballotBoxPers.state = this.ballotBoxPers.state;
        ballotBoxPers.tableId = this.ballotBoxPers.tableId;
        ballotBoxPers.tableKey = this.ballotBoxPers.tableKey;
        ballotBoxPers.votes = this.ballotBoxPers.votes;
        ballotBoxPers.candidates = this.ballotBoxPers.candidates;
        this.electionsKey = PublicKeyOps.toRSAPublicKey(this.ballotBoxPers.electionsKey);
        this.publicTableKey = PublicKeyOps.toRSAPublicKey(this.ballotBoxPers.tableKey.publicKey);
        try{
            this.privateTableKey = PrivateKeyOps.toRSAPrivateKey(this.ballotBoxPers.tableKey);
        }catch(err){

        }
        await ballotBoxPers.save();
    }

}
