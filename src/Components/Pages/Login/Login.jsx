import React from "react";

import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

import { Link } from "react-router-dom";


import "./Login.css";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <div className="pagina_login">
            <div className="container">
                <form onSubmit={handleSubmit}>
                <h1>Bem vindo Piadista</h1>
                
                <div className="container_input">
                    <FaUser className="icon"/>
                    <input type="text" placeholder="Digite seu Username." onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="container_input">
                    <FaLock className="icon"/>
                    <input type="password" placeholder="Digite sua Senha." onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button>Login</button>

                <div className="signup_link">
                    <p>Não tem uma conta? <Link to="/register">Cadastrar</Link></p>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Login