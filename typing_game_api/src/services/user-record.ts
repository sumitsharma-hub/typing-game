import { TypingMatch } from "../models";

export class UserRecordService{
    async userRecord(){
        
    }
    async fetchUserId(userID:string){
        // const baseId=await TypingMatch.findOne({userID}).exec();
        const baseId=await TypingMatch.findById(userID).exec();
        return baseId;
    }
}