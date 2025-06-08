import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element
}

export function ProtectedRoute({ children }: Props) {
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to={"/"} replace/>
    }
    return children
}