import GroupModel from '../models/GroupModel.js'

export default class GroupController {
  static async getGroups (req, res) {
    GroupModel.find()
      .sort({dateCreated: -1})
      .then(groups => res.status(200).json(groups))
      .catch(e => res.status(404).json(e));
  }

  static async getGroup (req, res) {
    const {id} = req.params;

    GroupModel.findById(id)
      .then(group => res.status(200).json(group))
      .catch(e => res.status(404).json(e));
  }

  static async postGroup(req, res) {
    const {name} = req.body;
    const group = {
      dateCreated: new Date().toISOString(),
      name: name
    };

    GroupModel.create(group)
      .then(data => res.status(201).json(data))
      .catch((e) => res.status(500).json(e));
  
  }

  static async updateGroup(req, res) {
    const {dateCreated, name} = req.body;
    const {id} = req.params;

    try {
      await GroupModel.validate({ name, dateCreated });

      GroupModel.findByIdAndUpdate(
        id, 
        {$set : { name, dateCreated} } , 
        { returnDocument: 'after'}
      )
        .then((g => res.status(201).json(g)))
        .catch(e => res.status(501).json(e));
    } catch (e) {
      res.status(400).json(e);
    }
  }

  static async deleteGroup(req, res) {
    const {id} = req.params;

    GroupModel.findByIdAndDelete(id)
      .then(group => res.status(200).json(group))
      .catch(e => res.status(404).json(e));  }
}