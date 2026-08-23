import { useEffect, useState } from "react";
import * as api from "../api/tasks";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import "./Tasks.css";

let toastId = 0;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // initial GET /tasks
  const [loadError, setLoadError] = useState(null);
  const [creating, setCreating] = useState(false); // POST in flight
  const [busyId, setBusyId] = useState(null); // PUT/DELETE in flight, per task
  const [pendingDelete, setPendingDelete] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const loadTasks = () => {
    setLoading(true);
    setLoadError(null);
    api
      .getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // --- Create (optimistic: show it before the server confirms) ---
  const handleCreate = async (form) => {
    setCreating(true);
    const tempId = `temp-${Date.now()}`;
    const optimisticTask = { ...form, _id: tempId, completed: false, _optimistic: true };
    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const saved = await api.createTask(form);
      setTasks((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
      showToast("Task created.", "success");
    } catch (err) {
      // Roll back — the write did not actually succeed on the server.
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      showToast(`Could not create task: ${err.message}`, "error");
    } finally {
      setCreating(false);
    }
  };

  // --- Update (edit form save, or checkbox toggle) ---
  const handleUpdate = async (id, form) => {
    setBusyId(id);
    try {
      const updated = await api.updateTask(id, form);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      showToast("Task updated.", "success");
    } catch (err) {
      showToast(`Could not update task: ${err.message}`, "error");
    } finally {
      setBusyId(null);
    }
  };

  const handleToggle = (task) => handleUpdate(task._id, { completed: !task.completed });

  // --- Delete (confirmation dialog first) ---
  const confirmDelete = async () => {
    const task = pendingDelete;
    setPendingDelete(null);
    setBusyId(task._id);
    try {
      await api.deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      showToast("Task deleted.", "success");
    } catch (err) {
      // Re-sync with the server rather than assuming the delete failed cleanly.
      showToast(`Could not delete task: ${err.message}`, "error");
      loadTasks();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="section-wrap tasks">
      <p className="section-label">Task Manager</p>

      <div className="tasks-grid">
        <div className="task-panel">
          <h3>New task</h3>
          <TaskForm submitLabel="Add task" submitting={creating} onSubmit={handleCreate} />
        </div>

        <div className="task-panel task-panel--list">
          <div className="task-panel-header">
            <h3>Tasks</h3>
            <button type="button" className="btn-ghost btn-sm" onClick={loadTasks} disabled={loading}>
              Refresh
            </button>
          </div>

          {loading && <Spinner label="Loading tasks…" />}

          {!loading && loadError && (
            <ErrorMessage title="Couldn't load tasks" message={loadError} onRetry={loadTasks} />
          )}

          {!loading && !loadError && tasks.length === 0 && (
            <p className="task-empty">No tasks yet — add one on the left.</p>
          )}

          {!loading && !loadError && tasks.length > 0 && (
            <ul className="task-list">
              {tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  busy={busyId === task._id}
                  onToggle={handleToggle}
                  onUpdate={handleUpdate}
                  onDelete={setPendingDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete task"
        message={pendingDelete ? `Delete "${pendingDelete.title}"? This can't be undone.` : ""}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
}

export default Tasks;
