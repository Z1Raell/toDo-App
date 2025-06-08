
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { TodoPage } from './pages/TodoPage'
import { ProtectedRoute } from './components/ProtectedRoute'





function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/todos' element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
