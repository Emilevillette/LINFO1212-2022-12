const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "louevainlinux.sqlite"
})

module.exports = {sequelize};