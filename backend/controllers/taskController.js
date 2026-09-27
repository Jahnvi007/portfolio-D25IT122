const Task = require('../models/Task');
const cache = require("../cache/cache");

// GET /tasks
async function getAllTasks(req, res, next) {
  try {
    const cacheKey = 'all_tasks';

    const cachedTasks = cache.get(cacheKey);

    if (cachedTasks) {
      console.log('Cache HIT: all_tasks');
      return res.status(200).json(cachedTasks);
    }

    console.log('Cache MISS: all_tasks');

    const tasks = await Task.find();

    cache.set(cacheKey, tasks);

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
}

// GET /tasks/:id
async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

// POST /tasks
async function createTask(req, res, next) {
  try {
    const { title, description, completed, priority } = req.body;

    const newTask = await Task.create({
      title,
      description,
      completed,
      priority
    });

    // Invalidate cached task list after creating a task
    cache.del('all_tasks');

    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
}

// PUT /tasks/:id
async function updateTask(req, res, next) {
  try {
    const { title, description, completed, priority } = req.body;

    const updated = await Task.findByIdAndUpdate(
      req.taskId,
      { title, description, completed, priority },
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Invalidate cached task list after updating a task
    cache.del('all_tasks');

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /tasks/:id
async function deleteTask(req, res, next) {
  try {
    const deleted = await Task.findByIdAndDelete(req.taskId);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Invalidate cached task list after deleting a task
    cache.del('all_tasks');

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};