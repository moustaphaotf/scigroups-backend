import mongoose from "mongoose";

const FeeModel = mongoose.model("fees", mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  groupId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  },
  paidAt: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 255
  }
}));

export default FeeModel;