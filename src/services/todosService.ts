import { Todo } from "@/interfaces/todo.interface";
import { getToken } from "@/services/authService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost/a:3000/api";

const getAuthHeaders = () => {
  const token = getToken();
  return { Authorization: token ? `Bearer ${token}` : "" };
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const getTodos = async () => {
  return fetchWithAuth(`${API_URL}/tasks`);
};

export const createTodo = async (todo: Todo) => {
  return fetchWithAuth(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(todo),
  });
};

export const editTodo = async (todo: Todo) => {
  return fetchWithAuth(`${API_URL}/tasks/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
};

export const updateTodoStatus = async (id: string, completed: boolean) => {
  return fetchWithAuth(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
  });
};

export const deleteTodoById = async (todoId: string) => {
  const headers = {
    ...getAuthHeaders(),
  };

  const response = await fetch(`${API_URL}/tasks/${todoId}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return;
};

export const getTodoById = async (todoId: string) => {
  return fetchWithAuth(`${API_URL}/tasks/${todoId}`);
};
