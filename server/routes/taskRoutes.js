const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const controller = require('../controllers/taskController');

router.use(auth);

router.post('/', [body('title').notEmpty().withMessage('Title is required')], controller.createTask);
router.get('/search', controller.getTasks);
router.get('/filter', controller.getTasks);
router.get('/statistics', controller.statistics);
router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
