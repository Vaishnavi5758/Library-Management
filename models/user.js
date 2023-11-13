const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  bookName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bookTakenOn: {
    type: Sequelize.DATE, // or Sequelize.DATEONLY
    allowNull: false
  },
  bookReturnDate: {
    type: Sequelize.DATE, // or Sequelize.DATEONLY
    allowNull: false
  },
  currentFare: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  finePaid: {
    type: Sequelize.BOOLEAN, // Assuming finePaid is a boolean field
    defaultValue: false
  }
});


module.exports = User;
