import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError("Please fill in both fields.");
      return;
    }

    console.log("Login details:", credentials);
    alert("Login Successful!");
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="login-button"
          disabled={!credentials.email || !credentials.password}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
