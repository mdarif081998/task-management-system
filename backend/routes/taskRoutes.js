const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { taskDetailsValidationRules, taskUpdateValidationRules, validate } = require('./inputValidator')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', taskDetailsValidationRules, validate, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', taskUpdateValidationRules, validate, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
