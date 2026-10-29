import { useState } from "react";
import { generateDescription } from "../api/ai";

const EMPTY = { title: "", description: "", priority: "medium" };

function TaskForm({
  initialTask,
  submitLabel,
  submitting,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(
    initialTask ? { ...EMPTY, ...initialTask } : EMPTY
  );

  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiNotice, setAiNotice] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!form.title.trim()) {
      setAiError("Enter a task title before generating a description.");
      setAiNotice("");
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiNotice("");

    try {
      const result = await generateDescription(form.title.trim());

      if (!result.description) {
        throw new Error("The AI service returned an empty description.");
      }

      // Put the suggestion into the editable description field.
      setForm((prev) => ({
        ...prev,
        description: result.description,
      }));

      setAiNotice(
        result.fallback
          ? "AI generation is unavailable. A fallback description was added; you can edit it."
          : "AI-generated content. Review and edit the suggestion before saving."
      );
    } catch (err) {
      setAiError(
        err.retryAfter
          ? `${err.message} Try again in ${err.retryAfter} seconds.`
          : err.message
      );
    } finally {
      setAiLoading(false);
    }
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
        disabled={submitting || aiLoading}
      />

      <label htmlFor="description">Description</label>

      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Optional details"
        rows={3}
        disabled={submitting || aiLoading}
      />

      <div className="ai-description-actions">
        <button
          type="button"
          className="btn-ghost"
          onClick={handleGenerateDescription}
          disabled={submitting || aiLoading}
        >
          {aiLoading ? "Generating..." : "✨ Generate Description"}
        </button>
      </div>

      {aiLoading && (
        <p className="ai-loading" role="status">
          Generating a description with AI. Please wait...
        </p>
      )}

      {aiError && (
        <p className="task-form-error" role="alert">
          {aiError}
        </p>
      )}

      {aiNotice && (
        <p className="ai-description-notice" role="status">
          {aiNotice}
        </p>
      )}

      <label htmlFor="priority">Priority</label>

      <select
        id="priority"
        name="priority"
        value={form.priority}
        onChange={handleChange}
        disabled={submitting || aiLoading}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {error && <p className="task-form-error">{error}</p>}

      <div className="task-form-actions">
        {onCancel && (
          <button
            type="button"
            className="btn-ghost"
            onClick={onCancel}
            disabled={submitting || aiLoading}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={submitting || aiLoading}
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;