import { useState } from "react"
import { TodoForm } from "../components/todoForm"
import { TodoItem } from "../components/TodoItem"
import type { Todo } from "../types/todo"

const initialTodos: Todo[] = [
    { id: '1', title: 'Выучить React', completed: false },
    { id: '2', title: 'Сделать моковый список', completed: true },
];

export function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>(initialTodos)
    const handleAdd = (title: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title,
            completed: false
        }
        setTodos((prev) => [newTodo, ...prev])
    }
    const handleToggle = (id: string) => {
        setTodos(prev => {
            return prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed }
                    : todo
            )
        })
    }
    const handleDelete = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    return (
        <>
            <h1>
                Мои задачи
            </h1>
            <TodoForm onAdd={handleAdd} />
            {todos.length > 0
                ? (
                    < div >

                        <ul>
                            {todos.map((todo) =>
                                <TodoItem key={todo.id} onToggle={handleToggle} todo={todo} onDelete={handleDelete} />
                            )}
                        </ul>
                    </div >
                ) :
                (<h1>
                    Нет задач
                </h1>
                )}

        </>
    )
}