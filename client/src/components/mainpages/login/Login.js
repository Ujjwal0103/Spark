import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/user/login",
        {
          ...user,
        },
        { withCredentials: true }
      );
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg); // Server-side error message
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        ></input>
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        ></input>
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
