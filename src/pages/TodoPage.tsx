import { useEffect, useState } from "react"
import { TodoForm } from "../components/todoForm"
import { TodoItem } from "../components/TodoItem"
import type { Todo } from "../types/todo"
import { Navbar } from "../components/Navbar";
import { ErrorMessage } from "../components/ErrorMessage";
import { safeFetch } from "../utils/safeFetch";



export function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [err, setErr] = useState<string | null>(null)

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const data = await safeFetch("http://localhost:3000/api/todo", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTodos(data.todos);
                setErr(null);
            } catch (error) {
                if (error instanceof Error) setErr(error.message);
            }
        };

        fetchTodo()
    }, [])
    const addTodo = async (title: string) => {
        try {
            const data = await safeFetch("http://localhost:3000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title }),
            });
            setTodos((prev) => [...prev, data.todo]);
            setErr(null);
        } catch (error) {
            if (error instanceof Error) setErr(error.message);
        }

    };



    const handleToggle = async (id: string) => {
        const todo = todos.find((t) => t._id === id);
        if (!todo) {
            return
        }


        try {
            const data = await safeFetch(`http://localhost:3000/api/todo/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: !todo.completed }),
            });

            setTodos((prev) =>
                prev.map((t) => (t._id === id ? data.todo : t))
            );
            setErr(null);
        } catch (error) {
            if (error instanceof Error) setErr(error.message);
        }

    }
    const handleDelete = async (id: string) => {
        try {
            await safeFetch(`http://localhost:3000/api/todo/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTodos((prev) => prev.filter((todo) => todo._id !== id));
            setErr(null);
        } catch (error) {
            if (error instanceof Error) setErr(error.message);
        }

    }
    console.log(err)

    return (
        <>
            <Navbar />
            <h1>
                Мои задачи
            </h1>
            {err && <ErrorMessage message={err} />}
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