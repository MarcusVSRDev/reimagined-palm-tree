import React, { useState } from "react";
//import styles from "./Login.css";//
import "./Login.css";
import { api } from "../../Services/api";
import { login } from "../../Services/utils"
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  function Submit(event) {
    event.preventDefault();
    api
      .post("/login/", {
        username,
        password
      })
      .then(resp => {
        login(resp.data.token);
        console.log(resp);
        history.push("/profiles");
      })
      .catch(error => console.error(error));
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
