const EventEmitter = require('events');

const taskEvents = new EventEmitter();

// Listener for task creation
taskEvents.on('task-created', (task) => {
  const eventTime = new Date().toLocaleString();

  const createdBy =
    task.createdBy ||
    'Not specified';

  console.log('\n[EVENT] task-created');
  console.log('Task Title:', task.title);
  console.log('Created By:', createdBy);
  console.log('Event Time:', eventTime);
  console.log('Notification scheduled. Waiting 2 seconds...');

  // Simulate a slow notification without blocking the API response
  setTimeout(() => {
    console.log('\n[NOTIFICATION SENT]');
    console.log('Task Title:', task.title);
    console.log('Created By:', createdBy);
    console.log('Notification Time:', new Date().toLocaleString());
  }, 2000);
});

// Listener for task deletion
taskEvents.on('task-deleted', (task) => {
  console.log('\n[EVENT] task-deleted');
  console.log('Task Title:', task.title);
  console.log('Event Time:', new Date().toLocaleString());
});

// Listener for errors
taskEvents.on('error', (err) => {
  console.error('\n[EVENT ERROR]', err.message);
});

module.exports = taskEvents;
