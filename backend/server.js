require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sendDueTaskNotifications = require('./utils/notification');
const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
    sendDueTaskNotifications();
});

const port = process.env.SERVER_PORT || 5500;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, async () => {
try {
    await sequelize.sync();
    console.log('Server running on port 5000');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});


module.exports = app;
