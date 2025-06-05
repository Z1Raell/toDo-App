import { useState, type FormEvent } from "react"




interface TodoformProps {
    onAdd: (title: string) => void
}

export function TodoForm({ onAdd }: TodoformProps) {
    const [text, setText] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim())
            setText('')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Новая задача"
            />
            <button type="submit">Добавить</button>
        </form>
    );

}