export default class StudentController {
  static async getStudents (req, res) {
    res.json({response : "All the students"});
  }

  static async getStudent (req, res) {
    res.json({response : "A student"});
  }

  static async postStudent(req, res) {
    res.json({response : "A student is added"});
  }

  static async updateStudent(req, res) {
    res.json({response : "A student is updated"});
  }

  static async deleteStudent(req, res) {
    res.json({response : "A student is deleted"});
  }
}