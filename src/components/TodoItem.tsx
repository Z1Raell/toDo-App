import type { Todo } from "../types/todo";

type Props = {
    todo: Todo,
    onToggle: (id: string) => void
}


export function TodoItem({ todo, onToggle }: Props) {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                </span>
            </label>
        </li>
    )
}