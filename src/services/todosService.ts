import { Todo } from "@/interfaces/todo.interface";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
      throw new Error("Error fetching tasks");
    }

    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTodo = async (todo: Todo) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Error creating task");
    }

    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const editTodo = async (todo: Todo) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Error editing task");
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const updateTodoStatus = async (id: string, completed: boolean) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo status");
  }

  return response.json();
};

export const deleteTodoById = async (todoId: string) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${todoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting task");
    }

    return response;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const getTodoById = async (todoId: string) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${todoId}`);

    if (!response.ok) {
      throw new Error("Task not found");
    }

    const task = await response.json();
    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};
