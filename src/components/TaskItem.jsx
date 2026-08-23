import { useState } from "react";
import TaskForm from "./TaskForm";

function TaskItem({ task, busy, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="task-card task-card--editing">
        <TaskForm
          initialTask={task}
          submitLabel="Save"
          submitting={busy}
          onCancel={() => setEditing(false)}
          onSubmit={async (form) => {
            await onUpdate(task._id, form);
            setEditing(false);
          }}
        />
      </li>
    );
  }

  return (
    <li
      className={`task-card priority-${task.priority}${
        task.completed ? " completed" : ""
      }${task._optimistic ? " pending" : ""}`}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        disabled={busy || task._optimistic}
      />

      <div className="task-body">
        <div className="task-title-row">
          <span className="task-title">{task.title}</span>
          <span className={`task-badge badge-${task.priority}`}>{task.priority}</span>
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn-ghost btn-sm"
          onClick={() => setEditing(true)}
          disabled={busy || task._optimistic}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-danger btn-sm"
          onClick={() => onDelete(task)}
          disabled={busy || task._optimistic}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
