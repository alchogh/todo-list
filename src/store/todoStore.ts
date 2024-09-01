import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

interface Filter {
	filter: 'all' | 'completed' | 'pending';
}

interface TodoStore {
	todos: Todo[];
	filter: Filter['filter'];
	inputValue: string;
	addTodo: (title: string) => void;
	removeTodo: (id: number) => void;
	toggleTodo: (id: number) => void;
	setFilter: (filter: Filter['filter']) => void;
	setInputValue: (value: string) => void;
}

export const useTodoStore = create<TodoStore>(
	persist(
		(set) => ({
			todos: [],
			filter: 'all' as 'all' | 'completed' | 'pending',
			inputValue: '',
			addTodo: (title) =>
				set((state) => ({
					todos: [...state.todos, { id: Date.now(), title, completed: false }],
					inputValue: '',
				})),
			removeTodo: (id) =>
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				})),
			toggleTodo: (id) =>
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id ? { ...todo, completed: !todo.completed } : todo,
					),
				})),
			setFilter: (filter) => set(() => ({ filter })),
			setInputValue: (value) => set(() => ({ inputValue: value })),
		}),
		{
			name: 'todo-storage',
		} as PersistOptions<TodoStore>, // PersistOptions 타입을 명시적으로 지정
	) as unknown as StateCreator<TodoStore>, // 여기에서 타입 단언을 사용하여 TypeScript가 타입을 무시하도록 함
);
