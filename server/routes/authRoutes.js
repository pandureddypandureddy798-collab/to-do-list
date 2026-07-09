const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const controller = require('../controllers/authController');

router.post(
  '/register',
  [body('name').notEmpty().withMessage('Name is required'), body('email').isEmail().withMessage('Valid email is required'), body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')],
  controller.register
);
router.post('/login', [body('email').isEmail().withMessage('Valid email is required'), body('password').notEmpty().withMessage('Password is required')], controller.login);
router.get('/profile', auth, controller.getProfile);
router.put('/profile', auth, controller.updateProfile);
router.put('/change-password', auth, [body('currentPassword').notEmpty().withMessage('Current password is required'), body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')], controller.changePassword);

module.exports = router;
