const nodemailer = require('nodemailer');
const Task = require('../models/Task');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendDueTaskNotifications = async () => {
    const tasks = await Task.findAll({
        where: {
            status: 'pending'
        }
    });

    tasks.forEach(task => {
        User.findByPk(task.assigned_user_id).then(user => {
            transporter.sendMail({
                to: user.email,
                subject: 'Task Due Reminder',
                text: `Your task "${task.title}" is due today.`
            });
        });
    });
};

module.exports = sendDueTaskNotifications;

