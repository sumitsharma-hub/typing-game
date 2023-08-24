import { time } from "console";
import mongoose from "mongoose";
import { string } from "yargs";

const userRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  records: [
    {
      text: {
        type: String,
        required: true,
      },
      typedText: {
        type: String,
        required: true,
      },
      wpm: {
        type: Number,
        required: true,
      },
      accuracy: {
        type: Number,
        required: true,
      },
      elapsedTime: {
        type: String,
        required: true,
      },
    },
  ],
});

const TypingMatch = mongoose.model("userRecord", userRecordSchema);

export default TypingMatch;
