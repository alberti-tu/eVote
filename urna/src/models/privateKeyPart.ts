import { Typegoose, prop } from "typegoose";


export default class PrivateKeyPart extends Typegoose {

    @prop()value:string;

    @prop()isHash:boolean;
}