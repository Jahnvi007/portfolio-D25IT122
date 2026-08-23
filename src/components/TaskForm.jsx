import { useState } from "react";

const EMPTY = { title: "", description: "", priority: "medium" };

// Handles both create (no initialTask) and edit (initialTask passed) —
// the payload shape sent to the API is identical either way.
function TaskForm({ initialTask, submitLabel, submitting, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialTask ? { ...EMPTY, ...initialTask } : EMPTY);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    await onSubmit(form);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. Finish Practical 6"
        disabled={submitting}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Optional details"
        rows={2}
        disabled={submitting}
      />

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        name="priority"
        value={form.priority}
        onChange={handleChange}
        disabled={submitting}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {error && <p className="task-form-error">{error}</p>}

      <div className="task-form-actions">
        {onCancel && (
          <button type="button" className="btn-ghost" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
