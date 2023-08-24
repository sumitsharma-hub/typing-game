import { TypingMatch } from "../models";

export class UserRecordService{
    async userRecord(){
        
    }
    async fetchUserId(userID:string){
        console.log('this is being called fetchUserId----------->')
        // const baseId=await TypingMatch.findOne({userID}).exec();
        const baseId=await TypingMatch.findById(userID).exec();
        console.log(baseId?._id,'----------baseId------------>')
        return baseId;
    }
}