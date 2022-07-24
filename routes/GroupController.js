export default class GroupController {
  static async getGroups (req, res) {
    res.json({response : "All the groups"});
  }

  static async getGroup (req, res) {
    res.json({response : "A group"});
  }

  static async postGroup(req, res) {
    res.json({response : "A group is added"});
  }

  static async updateGroup(req, res) {
    res.json({response : "A group is updated"});
  }

  static async deleteGroup(req, res) {
    res.json({response : "A group is deleted"});
  }
}