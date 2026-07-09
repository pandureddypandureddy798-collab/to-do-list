const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Invalid request', errors: errors.array() });
  }
  next();
};

exports.validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('category').optional().isIn(['personal', 'work', 'study', 'shopping', 'health', 'other']).withMessage('Invalid category'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('Due date must be a valid date'),
  validateRequest,
];
