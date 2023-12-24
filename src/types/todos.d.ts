export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;

  // timestamps
  createdAt?: number;
  updatedAt?: number;

  // Metas
  targetDate?: number;
}
