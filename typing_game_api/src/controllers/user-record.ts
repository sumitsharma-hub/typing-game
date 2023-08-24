import { type Request, type Response } from "express";
import { User, TypingMatch } from "../models";
import { UserRecordService } from "../services";

const recordService = new UserRecordService();
export class UserRecordController {
  //   async userRecord(request: Request, response: Response) {
  //     try {
  //       const data = request.body;
  //       const { UserId, text, typedText, wpm, accuracy, elapsedTime } =  request.body;
  //       const baseID = await recordService.fetchUserId(UserId);
  //       const user = await TypingMatch.findById(baseID).exec();
  //       if (user) {
  //         const recordData = {
  //           text: text,
  //           typedText: typedText,
  //           wpm: wpm,
  //           accuracy: accuracy,
  //           elapsedTime: elapsedTime,
  //         };
  //         user.records.push(recordData);
  //         await user.save();
  //       } else {
  //         const newRecord = new TypingMatch({
  //           userId: UserId,
  //           records: [
  //             {
  //               text,
  //               typedText,
  //               wpm,
  //               accuracy,
  //               elapsedTime,
  //             },
  //           ],
  //         });
  //         newRecord.save();
  //       }
  //       response.status(200).send({ user, message: "this is user REcord ssubmititig" });
  //     } catch (error) {
  //       response.send(error);
  //     }
  //   }

  async userRecord(request: Request, response: Response) {
    try {
      const {  userName,email,UserId, text, typedText, wpm, accuracy, elapsedTime } = request.body;
      console.log(request.body, "----------------->");

      // Find an existing user record by userId
      const existingUser = await TypingMatch.findOne({ userId: UserId }).exec();
      console.log(existingUser,'---------->existing user')

      if (existingUser) {
        existingUser.email=email,
        existingUser.userName=userName,
        // If user exists, update the records array
        existingUser.records.push({          
          text: text,
          typedText: typedText,
          wpm: wpm,
          accuracy: accuracy,
          elapsedTime: elapsedTime,
        });
        await existingUser.save();
      } else {
        // If user doesn't exist, create a new record
        const newRecord = new TypingMatch({
          userId: UserId,
          userName:userName,
          email:email,
          records: [
            {
              text,
              typedText,
              wpm,
              accuracy,
              elapsedTime,
            },
          ],
        });
        await newRecord.save();
      }

      response.status(200).send({ message: "User record submitted successfully" });
    } catch (error) {
      response.status(500).send({ error: "An error occurred while processing the request" });
    }
  }

  // user.records.push([...user.records,text, typedText, wpm, accuracy, elapsedTime])

  // TypingMatch.updateOne(
  //   //   { userId: UserId },
  //   {userID:UserId},
  //   {
  //     $push: { records: {text:text,typedText:typedText,wpm:wpm,accuracy:accuracy,elapsedTime:elapsedTime} },
  //   },
  // );

  async userRecords(request: Request, response: Response) {
    try {
      const { timestamp, text, typedText, wpm, accuracy, elapsedTime } = request.body;
      console.log(request.body, "----------------------><------------");
      let existingUserRecord = await TypingMatch.findById("1");
      if (existingUserRecord) {
        // existingUserRecord.records.push()
        const Userrecords = {
          records: [
            {
              timestamp,
              text,
              typedText,
              wpm,
              accuracy,
              elapsedTime,
            },
          ],
        };
        // TypingMatch.push({
        //   timestamp,
        //   text,
        //   typedText,
        //   wpm,
        //   accuracy,
        //   elapsedTime,
        // });
        // const existingUserRecord = {
        //   userId,
        //   records: [
        //     {
        //       timestamp,
        //       text,
        //       typedText,
        //       wpm,
        //       accuracy,
        //       elapsedTime,
        //     },
        //   ],
        // };

        // await existingUserRecord.save();
        // TypingMatch.create(existingUserRecord);
        // return existingUserRecord;
      } else {
        const newUserRecord = new TypingMatch({
          records: [
            {
              timestamp,
              text,
              typedText,
              wpm,
              accuracy,
              elapsedTime,
            },
          ],
        });

        const savedRecord = await newUserRecord.save();
        return savedRecord;
      }
      response.status(200).send({ existingUserRecord, message: "this is user REcord ssubmititig" });
    } catch (error) {
      response.status(400).json("something went wrong while submittng the records");
      throw error;
    }
  }
}
