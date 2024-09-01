import styled from 'styled-components';
import { useTodoStore } from './store/todoStore';

export default function App() {
	const {
		todos,
		filter,
		inputValue,
		addTodo,
		removeTodo,
		toggleTodo,
		setFilter,
		setInputValue,
	} = useTodoStore();

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'all') return true;
		if (filter === 'completed') return todo.completed;
		if (filter === 'pending') return !todo.completed;
	});

	const handleAddTodo = () => {
		if (inputValue.trim()) {
			addTodo(inputValue);
		}
	};

	return (
		<TodoStyle>
			<h1>Todo List</h1>
			<WriteBox>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="할일을 적어주세염"
				/>
				<button onClick={handleAddTodo}>+</button>
			</WriteBox>
			<FilterStyle>
				<button onClick={() => setFilter('all')}>All</button>
				<button onClick={() => setFilter('completed')}>Completed</button>
				<button onClick={() => setFilter('pending')}>Pending</button>
			</FilterStyle>

			<ul>
				{filteredTodos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleTodo(todo.id)}
						/>

						<p>{todo.title}</p>
						<button onClick={() => removeTodo(todo.id)}>삭제</button>
					</li>
				))}
			</ul>
		</TodoStyle>
	);
}

const TodoStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	button {
		cursor: pointer;
	}
	gap: 40px;

	ul {
		display: flex;
		flex-direction: column;
		gap: 10px;

		li {
			display: flex;
			gap: 10px;
			min-width: 700px;
			p {
				flex-grow: 1;
			}

			input button {
				flex-shrink: 1;
			}

			button {
				border: none;
				padding: 10px;
			}
		}
	}
`;

const WriteBox = styled.div`
	display: flex;
	gap: 10px;
	input {
		border: none;
		border-bottom: 1px solid gray;
		&:focus {
			border-bottom: 1px solid gray;
			background-color: #f0f8ff;
			outline: none;
		}
	}

	button {
		border: none;
		padding: 15px;
	}
`;

const FilterStyle = styled.div`
	display: flex;
	gap: 10px;
	button {
		padding: 1px;
		border: none;
		border-bottom: 1px solid black;

		background-color: white;
	}
`;
