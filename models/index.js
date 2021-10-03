const dbConfig = require("../config/db.config");
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.HOST
        /*   pool: {
               max: dbConfig.pool.max,
               min: dbConfig.pool.min,
               acquire: dbConfig.pool.acquire,
               idle: dbConfig.pool.idle
           }*/
    });

module.exports = sequelize;