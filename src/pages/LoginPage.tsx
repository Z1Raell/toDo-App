import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { safeFetch } from "../utils/safeFetch";

export function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSybmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const responce = await safeFetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await responce.json()
            if (!responce.ok) {
                throw new Error(data.message || "Ошибка входа");
            }
            localStorage.setItem("token", data.token)
            navigate("/todos")
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Неизвестная ошибка входа");
            }
        }
    }



    return (
        <>
            <h2>Вход</h2>
            <form onSubmit={handleSybmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Войти</button>
                {error && <ErrorMessage message={error} />}
            </form>
            <p>Нет акаунта ? <Link to="/register" > Зарегистрируйся</Link> </p>
        </>
    )

}