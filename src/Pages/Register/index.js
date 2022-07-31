import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import { api } from "../../Services/api";

export default function Register() {
  const [name, setUsername] = useState();
  const [email, setUseremail] = useState();
  const [companyName, setCompanyName] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  function Submit(event) {
    event.preventDefault();
    api
      .post("/perfis/", {
        nome: name,
        email: email,
        senha: password,
        nome_empresa: companyName
      })
      .then(resp => {
        console.log(resp)
        history.push("/");
      })
      .catch(error => console.error(error));
  }

  return (<div className="form-registro">
    <form onSubmit={Submit}>

      <label>
        Nome
        <input type="text" onChange={(event) => setUsername(event.target.value)} />
      </label>

      <label>
        E-mail
        <input type="text" onChange={(event) => setUseremail(event.target.value)} />
      </label>

      <label>
        Nome da Empresa
        <input type="text" onChange={(event) => setCompanyName(event.target.value)} />
      </label>

      <label>
        Senha
        <input type="password" onChange={(event) => setPassword(event.target.value)} />
      </label>

      <button>Aceite e Cadastre-se</button>

    </form>

    <p>Já se cadastrou no LinkedIn? <a href="/" className="tela-login">Entre</a></p>
  </div>);
}
