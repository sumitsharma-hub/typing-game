import mongoose  from "mongoose";

const userRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  typedText: {
    type: String,
    required: true
  },
  wpm: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  }
});

const TypingMatch = mongoose.model("userRecord", userRecordSchema);

module.exports = TypingMatch;
