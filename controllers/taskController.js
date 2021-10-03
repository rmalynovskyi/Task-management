const {Task} = require('../models/models');

class TaskController {

    async create(req, res) {
        const {name, topic, userId} = req.body;
        const task = await Task.create({name, topic, userId});
        return res.json(task);
    }

    async update(req, res) {
        const {id} = req.params;
        const {name, topic} = req.body;
        await Task.update(
            {name: name, topic: topic},
            {where: {id: id}}
        ).then((result, err) => {
                console.log(err);
                res.status(204).json();
            }
        )
    }

    async delete(req, res) {
        const {id} = req.params;
        await Task.destroy({where: {id: id}});
        res.status(204).json();
    }

    async getById(req, res) {
        const {id} = req.params;
        if (!id) {
            res.json({message: "No ID specified!"})
        } else {
            const task = await Task.findOne({
                where: {id: id}
            })
            return res.json(task);
        }
    }

    async getAllByUserId(req, res) {
        const {userId} = req.query;
        if (!userId) {
            res.json({message: "No user ID specified!"})
        } else {
            const tasks = await Task.findAll({where: {userId: userId}})
            return res.json(tasks);
        }
    }

    async getAll(req, res) {
        const tasks = await Task.findAll();
        return res.json(tasks);
    }
}

module.exports = new TaskController();