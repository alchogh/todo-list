import styled from 'styled-components';
import { useTodoStore } from './store/todoStore';
import { useEffect, useRef, useState } from 'react';

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

	const [visibleCount, setVisibleCount] = useState(10); // 처음에 10개만 표시
	const filteredTodos = todos.filter((todo) => {
		if (filter === 'all') return true;
		if (filter === 'completed') return todo.completed;
		if (filter === 'pending') return !todo.completed;
	});

	// 현재 보여줄 목록
	const visibleTodos = filteredTodos.slice(0, visibleCount);

	const handleAddTodo = () => {
		if (inputValue.trim()) {
			addTodo(inputValue);
		}
	};

	const [isIntersecting, setIsIntersecting] = useState(false);
	const targetRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsIntersecting(true);
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.1, // 10% 보일 때
			},
		);

		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => {
			if (targetRef.current) {
				observer.unobserve(targetRef.current);
			}
		};
	}, [visibleTodos]);

	// 마지막 요소가 화면에 들어오면 더 많은 항목 로드
	useEffect(() => {
		if (isIntersecting && visibleCount < filteredTodos.length) {
			setVisibleCount((prevCount) => prevCount + 10); // 10개씩 추가 로드
			setIsIntersecting(false);
		}
	}, [isIntersecting, visibleCount, filteredTodos.length]);

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
			<ListBox>
				<ul>
					{visibleTodos.map((todo, index) => (
						<li
							key={todo.id}
							ref={index === visibleTodos.length - 1 ? targetRef : null} // 마지막 요소에 ref 적용
						>
							<input
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleTodo(todo.id)}
							/>
							<p>{todo.title}</p>
							<button onClick={() => removeTodo(todo.id)}>X</button>
						</li>
					))}
				</ul>
			</ListBox>
		</TodoStyle>
	);
}

const TodoStyle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;

	button {
		cursor: pointer;
	}
	gap: 40px;
`;

const WriteBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	gap: 10px;
	input {
		border: none;
		padding-left: 14px;
		@media (max-width: 768px) {
			min-width: 200px;
		}
		min-width: 300px;

		border-bottom: 1px solid #d6d6d6;
		&:focus {
			border-bottom: 1px solid #d6d6d6;
			background-color: #f0f8ff;
			outline: none;
		}
	}

	button {
		background-color: #fbfbfb;
		border-radius: 8px;
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
		border-bottom: 1px solid #d6d6d6;

		background-color: white;
	}
`;

const ListBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 100%;
		li {
			display: flex;
			gap: 20px;
			border: 1px solid #fbfbfb;
			box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 아래쪽에 살짝 큰 그림자 */
			padding-left: 10px;
			border-radius: 12px;
			@media (max-width: 768px) {
				min-width: 300px;
			}
			min-width: 700px;
			p {
				flex-grow: 1;
			}

			input button {
				flex-shrink: 1;
			}

			button {
				border: none;
				background-color: white;
				padding: 10px;
				color: #d6d6d6;
				:hover {
					color: black;
				}
			}
		}
	}
`;
