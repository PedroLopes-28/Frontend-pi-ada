import React from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";

import "./Login.css";

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValido.test(email)) {
            alert("Digite um formato de email válido.");
            return;
        }

        if (password.length < 1) {
            alert("Digite sua senha.");
            return;
        }

        try {
            const resp = await api.post("/user/login", {email:email, password:password})

            const data = await resp.data

            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            localStorage.setItem("userName", data.name);


            navigate("/home");
        }

        catch (err) {
            console.error('Erro no login: ', err);
            const mensagem = err.response?.data?.message || err.response?.data?.error || 'Erro de rede. Tente novamente.';
            alert(mensagem);
        }
    };

    return (
        <div className="pagina_login">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Bem vindo Piadista</h1>

                    <div className="container_input">
                        <AiOutlineMail className='icon' />
                        <input
                            type="email"
                            value={email}
                            placeholder="Digite seu Email."
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="container_input">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            value={password}
                            placeholder="Digite sua Senha."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">Login</button>

                    <div className="signup_link">
                        <p>Não tem uma conta? <Link to="/register">Cadastrar</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
