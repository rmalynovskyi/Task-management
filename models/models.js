const sequelize = require('./index');
const DataTypes = require('sequelize');

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    solvedTasks: {type: DataTypes.INTEGER, defaultValue: 0},
    createdTasks: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Task = sequelize.define("task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    topic: {type: DataTypes.STRING, allowNull: false},
    solutions: {type: DataTypes.STRING, allowNull: false}
});

const CompleteTask = sequelize.define("completeTask", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    taskId: {type: DataTypes.INTEGER, allowNull: false},
    solution: {type: DataTypes.STRING, allowNull: false}
});

/*
const UserCompleteTask = sequelize.define("userCompleteTask", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});
*/

User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(CompleteTask);
CompleteTask.belongsTo(User);

module.exports = {
    User,
    Task,
    CompleteTask
}
