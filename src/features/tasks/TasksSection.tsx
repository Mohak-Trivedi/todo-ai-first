import { useState, type FormEvent } from "react";
import { useTasks } from "./useTasks";

export function TasksSection() {
  const { tasks, addTask, removeTask } = useTasks();
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addTask(draft);
    setDraft("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-task-title">New task</label>
        <input
          id="new-task-title"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul aria-label="Task list">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button type="button" onClick={() => removeTask(task.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
