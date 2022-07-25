import mongoose from "mongoose";

const GroupModel = mongoose.model("groups", mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 100,
    trim: true,
    required: true,
  },
  dateCreated: {
    required: true,
    type: Date
  }
}));

export default GroupModel;