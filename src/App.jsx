import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignUpPage from "./pages/auth/SignUpPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route excat path="/login" element={<LoginPage />} />
          <Route excat path="/forgot-password" element={<ForgotPassword />} />
          <Route excat path="/signup" element={<SignUpPage />} />

          <Route excat path="/" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
