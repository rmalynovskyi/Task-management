const {CompleteTask} = require('../models/models');

class CompleteTaskController {

    async create(req, res) {
        const {taskId, solution, userId} = req.body;
        const completeTask = await CompleteTask.create({taskId, solution, userId});
        return res.json(completeTask);
    }

    async getByTaskIdAndUserId(req, res) {
        const {taskId, userId} = req.query;
        if (!taskId || !userId) {
            res.json({message: "No ID specified!"})
        } else {
            const completeTask = await CompleteTask.findOne({
                where: {
                    taskId: taskId, userId: userId
                }
            })
            return res.json(completeTask);
        }
    }

    async delete(req, res) {
        const {id} = req.params;
        await CompleteTask.destroy({where: {taskId: id}});
        res.status(204).json();
    }
}

module.exports = new CompleteTaskController();