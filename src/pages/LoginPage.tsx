import { Link } from "react-router-dom";

export function LoginPage() {


    return (
        <>
            <h2>Вход</h2>
            <p>Нет акаунта ? <Link to="/register" > Зарегистрируйся</Link> </p>
        </>
    )

}