import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { safeFetch } from "../utils/safeFetch";
import { ErrorMessage } from "../components/ErrorMessage";

export function RegisterPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()


    const handlleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const data = await safeFetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, userName })
            })
            localStorage.setItem("token", data.token)
            navigate("/todos")
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        }


    }

    return (
        <>
            <h2>Регистрация</h2>
            <form onSubmit={handlleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="input"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
                {error && <ErrorMessage message={error} />}
            </form>
            <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </>
    )
}