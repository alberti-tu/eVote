import {BallotBoxTable, BallotBoxTableModel} from '../models/Table';
import {Request,Response} from 'express-serve-static-core'
import Vote from '../models/vote';


/**
 * 
 * @param req.params.tableId id of the elections
 * @param req.body.vote
 * @param req.body.firmVote
 * @param req.body.identity
 * @param req.body.firmIdentity
 * @param res 
 */
export async function addVote(req:Request,res:Response){
    let table = await BallotBoxTable.loadTable(req.params.tableId);
    if(table){
        try{
            let vote= new Vote();
            vote.vote = req.body.vote;
            vote.firmVote = req.body.firmVote;
            vote.identity = req.body.identity;
            vote.firmIdentity = req.body.firmIdentity;
            await table.addVote(vote);
        }catch(err){
            res.status(400).send((<Error>err).message);
            return;
        }
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

export async function getTables(req:Request,res:Response){
    let tables = await BallotBoxTableModel.find({},{tableId:1,state:1,candidates:1});
    res.send(tables);
}