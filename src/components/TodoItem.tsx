import type { Todo } from "../types/todo";

type Props = {
    todo: Todo,
    onToggle: (id: string) => void,
    onDelete: (id: string) => void
}


export function TodoItem({ todo, onToggle,onDelete }: Props) {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo._id)}
                />
                <input type="button" value="Delet" onClick={() => onDelete(todo._id)} />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                </span>
            </label>
        </li>
    )
}