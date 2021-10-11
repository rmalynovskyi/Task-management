const {Task, Rating} = require('../models/models');
const sequelize = require("../models");

class TaskController {

    async create(req, res) {
        const {name, description, topic, solutions, userId} = req.body;
        const task = await Task.create({name, description, topic, solutions, userId});
        return res.json(task);
    }

    async update(req, res) {
        const {id} = req.params;
        const {name, description, topic, solutions} = req.body;
        await Task.update(
            {name: name, description: description, topic: topic, solutions: solutions},
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
                where: {id: id}, include: [{model: Rating, as: 'ratings'}]
            })
            return res.json(task);
        }
    }

    async getAllLastAdded(req, res) {
        const tasks = await Task.findAll({
            subQuery: false,
            include: {model: Rating, as: 'ratings'},
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('ratings.value')), 'average'],
                ]
            },
            group: [
                'id',
            ],
            limit: 3,
            order: [['createdAt', 'DESC']],
        });
        return res.json(tasks);
    }

    async getAllHigherRating(req, res) {
        const tasks = await Task.findAll({
            subQuery: false,
            include: {model: Rating, as: "ratings"},
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('ratings.value')), 'average'],
                ]
            },
            limit: 3,
            group: [
                'id',
            ],
            order: [[sequelize.fn('AVG', sequelize.col('ratings.value')), 'DESC']]
        });
        return res.json(tasks);
    }

    async getAll(req, res) {
        const tasks = await Task.findAll({
            subQuery: false,
            include: {model: Rating, as: 'ratings'},
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('ratings.value')), 'average'],
                ]
            },
            group: [
                'id',
            ]
        });
        return res.json(tasks);
    }
}

module.exports = new TaskController();