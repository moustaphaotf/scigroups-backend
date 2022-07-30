import GroupModel from '../models/GroupModel.js';
import StudentModel from '../models/StudentModel.js'

export default class StudentController {
  static async getStudents (req, res) {
    const { groupId } = req.params;
    GroupModel.findById(groupId)
      .then(() => {
        StudentModel
          .aggregate([{
              $match: { "groups.groupId": groupId }
            },{
            $addFields: {
              currentGroup: {
                $filter: { input: '$groups', as: "group", cond: { $eq: ["$$group.groupId", groupId] } }
              }
            }
          }])
          .sort({"currentGroup.dateRegistered": -1})
          .then(d => res.status(200).json(d))
          .catch(e => res.status(404).json(e));
      })
      .catch(e => res.status(404).json(e));
  }

  static async getStudent (req, res) {
    const {id} = req.params;

    StudentModel.findById(id)
      .then(s => res.status(200).json(s))
      .catch (e => res.status(404).json(e));
  }

  static async postStudent(req, res) {
    // sent datas
    const {
      firstname, 
      lastname, 
      genre,
      phone,
      grade,
      schoolOfOrigin
    } = req.body;
    const { groupId } = req.params;

    // Check if the group exists
    GroupModel.findById(groupId)
      .then((group) => {
        // Check if the student is already registered (with his phone number)
        StudentModel.findOne({
          phone: phone,
          firstname: firstname,
          lastname: lastname,
          schoolOfOrigin: schoolOfOrigin
        }, (err, student) => {
          const studentData = {
            firstname,
            lastname,
            genre,
            phone,
            grade,
            schoolOfOrigin,
            groups: []
          }
          const groupData = {
            dateRegistered: new Date().toISOString(),
            groupId
          };
          // If so, push the group's info in there
          if(student){
            student.groups.push(groupData);
            
            StudentModel.findOneAndUpdate({phone: phone}, student)
              .then(() => res.status(201).json(student))
              .catch(e => res.status(500).json())
          }
          else if(!err){
            studentData.groups.push(groupData);
            StudentModel.create(studentData)
              .then(d => res.status(201).json(d))
              .catch(e => res.status(500).json(e));
          }
          else{
            res.status(500).json(err);
          }
        })
      })
      .catch( e => res.status(404).json(e));
    return;
  }

  static async updateStudent(req, res) {
    const {
      firstname,
      lastname,
      genre,
      phone,
      grade,
      schoolOfOrigin
    } = req.body;
    const { id } = req.params;

    const data = {
      firstname, lastname,
      genre, phone, grade,
      schoolOfOrigin
    };

    try {
      await StudentModel.validate(data);
      
      StudentModel.findByIdAndUpdate(
        id, 
        { $set: {...data} }, 
        {returnDocument: 'after'}
      )
        .then((old) => res.status(201).json(old))
        .catch(e => res.status(501).json(e));
    } catch (e) {
      res.status(400).json(e);  
    }
  }

  static async deleteStudent(req, res) {
    const {id} = req.params;

    StudentModel.findByIdAndDelete(id)
      .then(s => res.status(200).json(s))
      .catch (e => res.status(404).json(e));
  }
}