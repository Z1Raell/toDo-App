import { useEffect, useState } from "react"
import { TodoForm } from "../components/todoForm"
import { TodoItem } from "../components/TodoItem"
import type { Todo } from "../types/todo"



export function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
        const fetchTodo = async () => {
            const token = localStorage.getItem("token")
            try {
                const responce = await fetch("http://localhost:3000/api/todo", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (!responce.ok) {
                    throw new Error("Failed to fetch todos")
                }
                const data = await responce.json();
                setTodos(data.todos)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTodo()
    }, [])
    const addTodo = async (title: string) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:3000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) throw new Error("Failed to add todo");

            const data = await response.json();
            setTodos((prev) => [...prev, data.todo]);
        } catch (err) {
            console.error(err);
        }
    };



    const handleToggle = async (id: string) => {
        const token = localStorage.getItem("token");
        const todo = todos.find((t) => t._id === id);
        if (!todo) {
            return
        }


        try {
            const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: !todo.completed }),
            });
            if (!response.ok) throw new Error("Failed to update todo");
            const data = await response.json();

            setTodos((prev) =>
                prev.map((t) => (t._id === id ? data.todo : t))
            );

        } catch (error) {
            console.error(error);

        }
    }
    const handleDelete = async  (id: string) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete todo");

            setTodos((prev) => prev.filter((todo) => todo._id !== id));
        } catch {

        }
    }

    return (
        <>
            <h1>
                Мои задачи
            </h1>
            <TodoForm onAdd={addTodo} />
            {todos.length > 0
                ? (
                    < div >

                        <ul>
                            {todos.map((todo) =>
                                <TodoItem key={todo._id} onToggle={handleToggle} todo={todo} onDelete={handleDelete} />
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