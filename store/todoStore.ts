import { deleteApi, getApi, postApi, putApi } from "@/services/fetchAPI";
import toast from "react-hot-toast";
import { create } from "zustand";

export interface Todo {
	id: string;
	title: string;
}
interface TodoState {
	todos: Todo[];
	editingId: string | null;
	fetchTodos: () => Promise<void>;
	addTodo: (title: string) => Promise<void>;
	deleteTodo: (id: string, title: string) => Promise<void>;
	updateTodo: (id: string, title: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>(set => ({
	todos: [],
	editingId: null,
	fetchTodos: async () => {
		const todos = await getApi("/api/todos");
		toast.success(todos.length > 0 ? "Products loaded!" : "No products found!");
		set({ todos });
	},
	addTodo: async title => {
		const newTodo = await postApi("/api/todos", { title });
		toast.success(`Product ${newTodo.title} added!`);
		set(state => ({ todos: [...state.todos, newTodo] }));
	},
	deleteTodo: async (id, title) => {
		const deletedTodo = await deleteApi("/api/todos", id, title);
		console.log(deletedTodo);
		toast.error(`Product ${deletedTodo} deleted!`);
		set(state => ({
			todos: state.todos.filter(todo => todo.id !== id)
		}));
	},
	updateTodo: async (id, title) => {
		const updatedTodo = await putApi("/api/todos", { id, title });
		toast.success(`Product ${updatedTodo.title} updated!`);
		set(state => ({
			todos: state.todos.map(todo => (todo.id === id ? updatedTodo : todo)),
			editingId: null
		}));
	}
}));
