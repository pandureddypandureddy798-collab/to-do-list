const Task = require('../models/Task');
const { validationResult } = require('express-validator');

const STATUS_MAP = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const PRIORITY_MAP = { low: 'Low', medium: 'Medium', high: 'High' };
const CATEGORY_MAP = {
  personal: 'Personal',
  work: 'Work',
  study: 'Study',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

const normalizeTaskPayload = (payload) => {
  const normalized = { ...payload };

  if (payload.status) {
    normalized.status = STATUS_MAP[payload.status.toLowerCase()] || payload.status;
  }

  if (payload.priority) {
    normalized.priority = PRIORITY_MAP[payload.priority.toLowerCase()] || payload.priority;
  }

  if (payload.category) {
    normalized.category = CATEGORY_MAP[payload.category.toLowerCase()] || payload.category;
  }

  if (payload.dueDate === '') {
    delete normalized.dueDate;
  }

  return normalized;
};

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const payload = normalizeTaskPayload({ ...req.body, user: req.user.id });
    const task = await Task.create(payload);
    res.status(201).json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.trim();
    const status = STATUS_MAP[req.query.status?.toLowerCase()];
    const priority = PRIORITY_MAP[req.query.priority?.toLowerCase()];
    const category = CATEGORY_MAP[req.query.category?.toLowerCase()];
    const sortParam = req.query.sort || req.query.sortBy;
    const query = { user: req.user.id, isDeleted: false };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const sortMap = {
      newest: '-createdAt',
      oldest: 'createdAt',
      priority: 'priority',
      dueDate: 'dueDate',
      alphabetical: 'title',
    };

    const sortOrder = sortMap[sortParam] || '-createdAt';
    const total = await Task.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const tasks = await Task.find(query)
      .sort(sortOrder)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      data: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        tasks,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id, isDeleted: false });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updates = normalizeTaskPayload(req.body);
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, updates, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

exports.statistics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const total = await Task.countDocuments({ user: userId, isDeleted: false });
    const pending = await Task.countDocuments({ user: userId, status: 'Pending', isDeleted: false });
    const inProgress = await Task.countDocuments({ user: userId, status: 'In Progress', isDeleted: false });
    const completed = await Task.countDocuments({ user: userId, status: 'Completed', isDeleted: false });
    const high = await Task.countDocuments({ user: userId, priority: 'High', isDeleted: false });
    const upcoming = await Task.find({ user: userId, dueDate: { $gte: new Date() }, isDeleted: false }).sort('dueDate').limit(5);
    const completionPercentage = total ? Math.round((completed / total) * 100) : 0;

    res.json({
      success: true,
      data: {
        stats: {
          totalTasks: total,
          pendingTasks: pending,
          inProgressTasks: inProgress,
          completedTasks: completed,
          highPriorityTasks: high,
          completionPercentage,
          upcomingDueTasks: upcoming,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
