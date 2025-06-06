import { Link } from "react-router-dom";

export function RegisterPage() {
    return (
        <>
            <h2>Регестрация</h2>
            <p >Уже есть акаунт ? <Link to="/" >Войти</Link></p>
        </>
    )
}