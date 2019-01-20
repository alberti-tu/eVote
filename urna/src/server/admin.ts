import {BallotBoxTable} from '../models/Table'
import {Request,Response} from 'express-serve-static-core'
import * as RSA from '../rsaLib';
import BigNum from 'bignum'

/**
 * 
 * @param req.body.electionsKey public key for the elections
 * @param req.body.tableId id of the elections
 * @param res 
 */
export async function newTable(req:Request,res:Response){
    let electionsKey = new RSA.PublicKey();
    electionsKey.keyNumber = new BigNum(<string>req.body.electionsKey.keyNumber,16);
    electionsKey.mod = new BigNum(<string>req.body.electionsKey.mod,16)
    let candidates = <string[]>req.body.candidates;
    let tableId = req.body.tableId;
    try{
        let table = await BallotBoxTable.newTable(electionsKey,tableId,candidates);
        res.send({
            tableID:table.ballotBoxPers.tableId,
            state:table.ballotBoxPers.state,
            publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
            publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
            candidates:table.ballotBoxPers.candidates
        })
    }catch(err){
        res.status(400).send({err})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param res 
 */
export async function getTableInfo(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        res.send({
            tableID:table.ballotBoxPers.tableId,
            state:table.ballotBoxPers.state,
            publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
            publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
            candidates:table.ballotBoxPers.candidates
        })
    }else{
        res.status(404).send({err:'table not found'})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param req.body.parts parts to split the table key
 * @param req.body.threshold threshold for recover the key the table key
 * @param res 
 */
export async function split(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            await table.split(req.body.parts,req.body.threshold);
            res.send({
                tableID:table.ballotBoxPers.tableId,
                state:table.ballotBoxPers.state,
                publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
                publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
                candidates:table.ballotBoxPers.candidates
            })
        }catch(err)
        {
            res.status(400).send({err});
        }
    }else{
        res.status(404).send({err:'table not found'})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param res 
 */
export async function popPart(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            let part = await table.popPart();
            res.send({
                tableID:table.ballotBoxPers.tableId,
                state:table.ballotBoxPers.state,
                publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
                publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
                candidates:table.ballotBoxPers.candidates,
                part:part
            })
        }catch(err){
            res.status(400).send((<Error>err).message);
        }
    }else{
        res.status(404).send({err:'table not found'})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param res 
 */
export async function startVote(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            await table.startVote();
            res.send({
                tableID:table.ballotBoxPers.tableId,
                state:table.ballotBoxPers.state,
                publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
                publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
                candidates:table.ballotBoxPers.candidates
            })
        }catch(err){
            res.status(400).send((<Error>err).message);
        }
    }else{
        res.status(404).send({err:'table not found'})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param res 
 */
export async function stopVote(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            await table.stopVote();
            res.send({
                tableID:table.ballotBoxPers.tableId,
                state:table.ballotBoxPers.state,
                publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
                publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
                candidates:table.ballotBoxPers.candidates
            })
        }catch(err){
            res.status(400).send((<Error>err).message);
        }
    }else{
        res.status(404).send({err:'table not found'})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param req.body.part parts to split the table key
 * @param res 
 */
export async function pushPart(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            await table.pushPart(req.body.part);
            res.send({
                tableID:table.ballotBoxPers.tableId,
                state:table.ballotBoxPers.state,
                publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
                publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
                candidates:table.ballotBoxPers.candidates
            })
        }catch(err){
            res.status(400).send((<Error>err).message);
        }
    }else{
        res.status(404).send({err:'table not found'})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param res 
 */
export async function recoverKey(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            await table.recoverKey();
            res.send({
                tableID:table.ballotBoxPers.tableId,
                state:table.ballotBoxPers.state,
                publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
                publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
                candidates:table.ballotBoxPers.candidates
            })
        }catch(err){
            res.status(400).send((<Error>err).message);
        }
    }else{
        res.status(404).send({err:'table not found'})
    }
}

/**
 * 
 * @param req.params.tableId id of the elections
 * @param res 
 */
export async function results(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            let results = await table.getResults();
            res.send({
                tableID:table.ballotBoxPers.tableId,
                state:table.ballotBoxPers.state,
                publicKey:table.ballotBoxPers.tableKey.publicKey.keyNumber,
                publicKeyMod:table.ballotBoxPers.tableKey.publicKey.mod,
                candidates:table.ballotBoxPers.candidates,
                results:results
            })
        }catch(err){
            res.status(400).send((<Error>err).message);
        }
    }else{
        res.status(404).send({err:'table not found'})
    }
}