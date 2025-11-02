import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import "./Register.css";

// Password validation function
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    errors: [
      { condition: password.length >= minLength, message: 'At least 8 characters' },
      { condition: hasUpperCase, message: 'At least one uppercase letter' },
      { condition: hasLowerCase, message: 'At least one lowercase letter' },
      { condition: hasNumbers, message: 'At least one number' },
      { condition: hasSpecialChar, message: 'At least one special character' }
    ]
  };
};

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    errors: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const validation = validatePassword(password);
    setPasswordValidation(validation);
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setIsLoading(false);
      return alert("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      return alert("Passwords do not match");
    }

    if (!passwordValidation.isValid) {
      setIsLoading(false);
      return alert("Please ensure your password meets all requirements");
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ '--i': 0 }}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ '--i': 1 }}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="user@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ '--i': 2 }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && (
              <div className="password-strength">
                <p>Password must contain:</p>
                <ul>
                  {passwordValidation.errors.map((item, index) => (
                    <li key={index} className={item.condition ? 'valid' : 'invalid'}>
                      {item.condition ? '✓' : '✗'} {item.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="form-group" style={{ '--i': 3 }}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="error-message">Passwords do not match</p>
            )}
          </div>

          <div className="form-group" style={{ '--i': 4 }}>
            <label>Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="role-selector"
              required
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading || !name || !email || !password || !confirmPassword || !passwordValidation.isValid || password !== confirmPassword}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-links">
          <p className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
