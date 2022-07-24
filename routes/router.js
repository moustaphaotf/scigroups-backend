import express from 'express';
import GroupController from './GroupController.js'
import StudentController from './StudentController.js'
import FeeController from './FeeController.js'

const router = express.Router();

// Groupes 
router.route('/groups')
  .get(GroupController.getGroups)
  .post(GroupController.postGroup);

router.route('/groups/:id')
  .get(GroupController.getGroup)
  .put(GroupController.updateGroup)
  .delete(GroupController.deleteGroup);


// Students
router.route('/groups/:groupId/students')
.get(StudentController.getStudents)
.post(StudentController.postStudent);

router.route('/groups/:groupId/students/:studentId')
  .get(StudentController.getStudent)
  .put(StudentController.updateStudent)
  .delete(StudentController.deleteStudent);


// Fees
router.route('/groups/:groupId/students/:studentId/fees')
  .get(FeeController.getFees)
  .post(FeeController.postFee);

router.route('/groups/:groupId/students/:studentId/fees/:feeId')
  .get(FeeController.getFee)
  .put(FeeController.updateFee)
  .delete(FeeController.deleteFee);

export default router;