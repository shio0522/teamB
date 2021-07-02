import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "./AuthService";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const user = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Redirect to={`/user/${user.uid}`} />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(`/user/${user.uid}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">新規登録</Link>
    </>
  );
};

export default Login;
