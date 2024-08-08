const { validationResult, body } = require('express-validator');

exports.userRegisterValidationRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

exports.userUpdateValidationRules = [
    body('username').optional(),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

exports.userLoginValidationRules = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long')
];

exports.taskDetailsValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('due_date').notEmpty().withMessage('Due date must be a valid date'),
    body('status').notEmpty().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('priority').notEmpty().isIn(['high', 'medium', 'low']).withMessage('Invalid priority'),
    body('category').optional(),
    body('assigned_user_id').notEmpty().withMessage('assigned_user_id is required'),
];

exports.taskUpdateValidationRules = [
    body('title').optional(),
    body('description').optional(),
    body('due_date').optional(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['high', 'medium', 'low']).withMessage('Invalid priority'),
    body('category').optional(),
    body('assigned_user_id').optional(),
];


// Validation middleware
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}