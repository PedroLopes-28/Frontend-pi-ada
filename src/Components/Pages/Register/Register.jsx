import React from 'react'

import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";

import { Await, Link, useNavigate } from "react-router-dom";

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
          const resp = await fetch('http://localhost:3333/user', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({name, email, password}),
          });

          //resposta que o back vai enviar pro front
          const data = await resp.json();

          if(!resp.ok){
            //esse data message vem do back
            alert(data.message || 'Erro no cadastro.');
            return;
          }

          alert('Você foi cadastrado! Faça o Login.');
          navigate('/');
        }

        catch (err){
          console.error("Erro no cadastro:", err);
          alert("Erro na rede.")
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
                  <p>Realize o <Link to="/">Login</Link></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Register
