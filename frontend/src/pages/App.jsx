import '../styles/App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Tasks from "../components/Tasks";
import Login from "../components/Login";
import Register from "../components/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <h1>📝 React Task Evaluator</h1>
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <Tasks /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App
