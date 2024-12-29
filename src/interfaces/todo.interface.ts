export enum Status {
  pending,
  completed,
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
