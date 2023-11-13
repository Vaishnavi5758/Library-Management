const Sequelize = require('sequelize');

const sequelize = new Sequelize('Library', 'root', 'Suyogniwas57@', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
