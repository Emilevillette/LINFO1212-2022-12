const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "preparatoryproject.sqlite"
})

module.exports = {sequelize};