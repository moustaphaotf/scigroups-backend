import mongoose from "mongoose";

const StudentModel = mongoose.model("students", mongoose.Schema({
  firstname: {
    type: String,
    minLength: 3,
    maxLength: 20,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    minLength: 3,
    maxLength: 30,
    trim: true,
    required: true
  },
  genre: {
    type: String,
    uppercase: true,
    enum: ['M', 'F'],
    required: true
  }, 
  phone: {
    type: String,
    match: new RegExp("^[0-9]{9,20}$"),
    minLength: 9,
    maxLength: 20,
    trim: true,
    unique: true,
    required: true
  },
  grade: {
    type: String,
    trim: true,
    required: true
  },
  groups: [{
    groupId: String,
    dateRegistered: Date
  }]
}));

export default StudentModel;