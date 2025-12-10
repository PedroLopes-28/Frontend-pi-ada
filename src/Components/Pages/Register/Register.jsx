import React from 'react'

import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import api from '../../../services/api';
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {

    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name.trim()) {
          alert("Você deve criar um nome de usuário.");
          return;
        }

        if(!emailValido.test(email)){
          alert('Formato de email inválido.');
          return;
        }

        if(password.length < 8){
          alert('A senha deve ter pelo menos 8 caracteres.');
          return;
        }

        if(password !== passwordConfirm){
          alert('As senhas são diferentes.');
          return;
        }

        try{
          await api.post("/user", {name:name ,email:email, password:password})

          alert('Você foi cadastrado! Faça o Login.');
          navigate('/');
        }

        catch (err){
          console.error("Erro no cadastro:", err);
          const mensagem = err.response?.data?.message || err.response?.data?.error || 'Erro na rede.';
          alert(mensagem);
        }
    };

  return (
    <div className='pagina_cadastro'>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Faça seu Cadastro</h1>

                <div className='container_input'>
                  <FaUser className='icon'/>
                  <input type="text" value={name} placeholder='Crie seu Username.' onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className='container_input'>
                  <AiOutlineMail className='icon'/>
                  <input type="email" value={email} placeholder='Digite seu Email.' onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='container_input'>
                  <FaLock className='icon'/>
                  <input type="password" value={password} placeholder='Crie uma Senha.' onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className='container_input'>
                  <FaLock className='icon'/>
                  <input type="password" value={passwordConfirm} placeholder='Repita a Senha.' onChange={(e) => setPasswordConfirm(e.target.value)}/>
                </div>

                <button type='submit'>Cadastrar</button>

                <div className='login_link'>
                  <p>Já se cadastrou? Realize o <Link to="/">Login</Link></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Register
