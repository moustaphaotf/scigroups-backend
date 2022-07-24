export default class FeeController {
  static async getFees (req, res) {
    res.json({response : "All the fees"});
  }

  static async getFee (req, res) {
    res.json({response : "A fee"});
  }

  static async postFee(req, res) {
    res.json({response : "A fee is added"});
  }

  static async updateFee(req, res) {
    res.json({response : "A fee is updated"});
  }

  static async deleteFee(req, res) {
    res.json({response : "A fee is deleted"});
  }
}