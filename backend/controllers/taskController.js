const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, due_date, priority, category, assigned_user_id } = req.body;
        const task = await Task.create({
            title, description, due_date, status, priority, category,
            created_user_id: req.user.id, assigned_user_id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (task) {

            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, due_date, status, priority, category, assigned_user_id } = req.body;
        const task = await Task.findByPk(id);
        if (task) {
            await task.update({ title, description, due_date, status, priority, category, assigned_user_id });
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (task) {
            await task.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
