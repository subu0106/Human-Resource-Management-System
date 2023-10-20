import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      await login(inputs).then(console.log);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  return (
    <div className="App-header">
      <div className="login-box">
        <div className="company-heading">JUPITER APPARELS</div>
        <form>
          {/* <div>
            <input
              required
              className="input-field"
              type="text"
              placeholder="User Name"
              name="user_name"
              onChange={handleChange}
            />
          </div> */}

          
          <div className="input-box">
            <input
                  type="text"
                  required
                  name="user_name"
                  id="user_name"
                  placeholder="User Name"
                  autoFocus       //can type in the input field without clicking on it
                  autoComplete="off"
                  className="input-field"
                  onChange={handleChange}
              />
            </div>

          {/* <div>
            <input
              required
              className="input-field"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            
          </div> */}

          <div className="input-box">
            <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoFocus       //can type in the input field without clicking on it
                  autoComplete="off"
                  className="input-field"
                  onChange={handleChange}
              />
            </div>

          <div className="input-submit">
                <button className="submit-btn" id="submit" onClick={handleSubmit}/>
                <label htmlFor="submit">Login</label>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
