const dbConfig = require("../config/db.config");
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.HOST
    });

module.exports = sequelize;