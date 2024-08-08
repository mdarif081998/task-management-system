const express = require('express');
const { register, login, getuserById, updateUser, getusers, deleteUser } = require('../controllers/authController');
const { userRegisterValidationRules, userLoginValidationRules, userUpdateValidationRules, validate } = require('./inputValidator')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', userRegisterValidationRules, validate, register);
router.post('/login', userLoginValidationRules, validate, login);
router.use(authMiddleware);
router.get('/:id', getuserById);
router.get('/', getusers);
router.put('/:id',userUpdateValidationRules, validate,  updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
