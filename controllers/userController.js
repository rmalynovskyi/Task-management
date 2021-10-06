const {User, Task} = require('../models/models');

class UserController {

    async create(req, res) {
        const {name} = req.body;
        const userDb = await User.findOne({where: {name}});
        if (!userDb) {
            const user = await User.create({name});
            return res.json(user);
        } else {
            return res.json(userDb);
        }
    }

    async update(req, res) {
        const {id} = req.params;
        const {name, solvedTasks, createdTasks} = req.body;
        await User.update(
            {name: name, solvedTasks: solvedTasks, createdTasks: createdTasks},
            {where: {id: id}}
        ).then(() => {
                res.status(204).json();
            }
        )
    }

    async getAll(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async getById(req, res) {
        const {id} = req.params;
        if (!id) {
            res.json({message: "No ID specified!"})
        } else {
            const user = await User.findOne({
                where: {id}, include: [{model: Task, as: 'tasks'}]
            })
            return res.json(user);
        }
    }
}

module.exports = new UserController();