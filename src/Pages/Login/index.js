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
        history.push("/perfis/");
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="form">
      <h2>Entrar</h2>
      <p>Acompanhe as novidades do seu mundo profissional</p>
      <form>
        <label>
          <input type="text" onChange={(event) => setUsername(event.target.value)} placeholder="Email" />
        </label>
        <label>
          <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Senha" />
        </label>
        <button type="submit" onClick={Submit}>Entrar</button>
      </form>
      <p>Novo no LinkedIn? <a href="/registro" className="cadastro">Cadastre-se</a></p>
    </div>
  );
}
