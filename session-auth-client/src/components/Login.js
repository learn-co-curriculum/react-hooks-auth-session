import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

function Login({ onUpdateUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleGoogleLogin(response) {
    if (response.tokenId) {
      fetch("http://localhost:3000/google_login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.tokenId}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          onUpdateUser(user);
        });
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: make a fetch request to login the current user
    // then set that user in state in our App component
    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((user) => onUpdateUser(user));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <input type="submit" value="Login" />
      </form>
      <hr />
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
