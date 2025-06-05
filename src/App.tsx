import { useState } from 'react'
import './App.css'
import type { Todo } from './types/todo';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/todoForm';

const initialTodos: Todo[] = [
  { id: '1', title: 'Выучить React', completed: false },
  { id: '2', title: 'Сделать моковый список', completed: true },
];


function App() {
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

  return (
    <>
      {todos.length > 0
        ? (
          < div >
            <h1>
              Мои задачи
            </h1>
            <TodoForm onAdd={handleAdd} />
            <ul>
              {todos.map((todo) =>
                <TodoItem key={todo.id} onToggle={handleToggle} todo={todo} />
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

export default App
