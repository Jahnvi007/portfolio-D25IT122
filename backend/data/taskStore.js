// In-memory "database" for tasks.
// Replaced with a real database in a later practical if required.

let tasks = [
  { id: 1, title: 'Learn Express basics', completed: false },
  { id: 2, title: 'Build CRUD routes', completed: false }
];

let nextId = 3;

const getAll = () => tasks;

const getById = (id) => tasks.find((task) => task.id === id);

const create = (title, completed = false) => {
  const newTask = { id: nextId++, title, completed };
  tasks.push(newTask);
  return newTask;
};

const update = (id, updates) => {
  const task = getById(id);
  if (!task) return null;
  if (updates.title !== undefined) task.title = updates.title;
  if (updates.completed !== undefined) task.completed = updates.completed;
  return task;
};

const remove = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
