import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./loginForm.css"; // Import your CSS file.

const Login = () => {
  const [inputs, setInputs] = useState({
    user_name: "", // Changed from "username"
    password: "",
    remember: false,
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="App-header">
      <div className="login-box">
        <div className="company-heading">JUPITER APPARELS</div>
        <h1 className="login-header">Login</h1>
        <form>
          <input
            required
            className="input-field"
            type="text"
            placeholder="User Name"
            name="user_name"
            onChange={handleChange}
          />
          <input
            required
            className="input-field"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <div className="input-submit">
            <button className="submit-btn" onClick={handleSubmit}>
              Login
            </button>
          </div>
          {err && <p className="alert alert-danger">{err}</p>}
          <div className="remember">
            <section>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </section>
            <Link to="/register">Don't you have an account? Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
