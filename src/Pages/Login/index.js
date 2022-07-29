import React, { useState } from "react";
//import styles from "./Login.css";//
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function Submit(event) {
    event.preventDefault();
    console.log(username, password);
  }

  return (
    <div className="form">
      <form>
        <label>
          Username
          <input type="text" onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit" onClick={Submit} >Login</button>
      </form>
    </div>);
}
