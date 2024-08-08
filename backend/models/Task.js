const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    due_date: DataTypes.DATE,
    status: { type: DataTypes.ENUM('pending', 'in-progress', 'completed'), allowNull: false },
    priority: { type: DataTypes.ENUM('high', 'medium', 'low'), allowNull: false },
    category: DataTypes.STRING
});

Task.belongsTo(User, { as: 'creator', foreignKey: 'created_user_id' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assigned_user_id' });

module.exports = Task;
