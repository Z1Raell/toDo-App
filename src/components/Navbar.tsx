import { useNavigate } from "react-router-dom"



export function Navbar() {
    const navigate = useNavigate();

    let handleLogaut = function () {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <>
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "#f0f0f0",
                borderBottom: "1px solid #ccc"
            }}>
                <button type="button" onClick={handleLogaut}>Выход</button>
            </nav>
        </>
    )
}