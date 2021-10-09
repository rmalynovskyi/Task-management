const {Rating} = require('../models/models');

class RatingController {

    async create(req, res) {
        const {value, userId, taskId} = req.body;
        const rating = await Rating.create({value, userId, taskId});
        return res.json(rating);
    }

    async getByTaskIdAndUserId(req, res) {
        const {taskId, userId} = req.query;
        if (!userId) {
            res.json({message: "No user ID specified!"})
        } else {
            const rating = await Rating.findAll({where: {taskId: taskId, userId: userId}})
            return res.json(rating);
        }
    }

    async getAllByTaskId(req, res) {
        const {taskId} = req.query;
        const ratings = await Rating.findAll({where: {taskId: taskId}});
        return res.json(ratings);
    }
}

module.exports = new RatingController();