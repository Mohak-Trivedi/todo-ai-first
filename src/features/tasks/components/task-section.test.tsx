import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vite-plus/test";
import { TasksSection } from "../TasksSection";

async function addTask(user: ReturnType<typeof userEvent.setup>, title: string): Promise<void> {
  await user.type(screen.getByLabelText("New task"), `${title}{Enter}`);
}

describe("TasksSection", () => {
  it("adds a task and clears the input", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);

    const input = screen.getByLabelText("New task");
    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("does not add a task when the input is empty", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);

    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("adds a task when pressing Enter in the input", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);

    const input = screen.getByLabelText("New task");
    await user.type(input, "Buy milk{Enter}");

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("removes a task when its Remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);

    await addTask(user, "Buy milk");
    await addTask(user, "Walk dog");

    const walkDogItem = screen.getByText("Walk dog").closest("li")!;
    await user.click(within(walkDogItem).getByRole("button", { name: "Remove" }));

    expect(screen.queryByText("Walk dog")).not.toBeInTheDocument();
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("empties the list when removing the only task", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);

    await addTask(user, "Buy milk");
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
