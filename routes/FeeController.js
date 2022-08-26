import FeeModel from "../models/FeeModel.js";
import StudentModel from "../models/StudentModel.js";

export default class FeeController {
  static async getFees (req, res) {
    const { groupId, studentId } = req.params;

    FeeModel.find({ groupId, studentId })
      .sort({paidAt: -1})
      .then(f => res.status(200).json(f))
      .catch(e => res.status(404).json(e));
  }

  static async getFeesByGroup (req, res) {
    const { groupId } = req.params;

    FeeModel.aggregate([{
      $match: {
        groupId,
      }},
    {
      $group: {
        _id: groupId,
        totalAmount: {
          $sum: "$amount"
        }
      }
    }]).then(data => res.status(200).json(data))
    .catch(e => res.status(404).json(e));
  }

  static async postFee(req, res) {
    const { amount, description } = req.body; 
    const { studentId, groupId } = req.params;
    
    StudentModel.findOne({
      _id: studentId,
      groups : {
        $elemMatch: {
          groupId: groupId
        }
      }
    }).then(student => {
      if(student){
        const data = { paidAt : new Date().toISOString(), amount, studentId, groupId, description };
        FeeModel.create(data)
          .then(d => res.status(201).json(d))
          .catch(error => res.status(501).json(error))
      }
      else{
        res.status(404).json({error : "This student was not found"})
      }
    })
  }

  static async updateFee(req, res) {
    const { id } = req.params;
    const { paidAt, amount, description } = req.body;
    
    FeeModel.findById(id)
      .then(f => {
        const {groupId, studentId} = f;
        const data = {
          groupId, 
          studentId,
          paidAt,
          amount,
          description
        }
        FeeModel.validate(f)
          .then(() => {
            FeeModel.findOneAndUpdate({_id: id}, {$set: data}, { returnDocument: 'after'} )
              .then(fee => res.status(201).json(fee))
              .catch(e => res.status(501).json(e));
          })
          .catch(e => res.status(400).json(e));

      }).catch(e => {
        res.status(404).json(e);            
      });
  }

  static async deleteFee(req, res) {
    const { id } = req.params;

    FeeModel.findByIdAndDelete(id)
      .then(f => res.status(200).json(f))
      .catch(e => res.status(404).json(e))
  }
}