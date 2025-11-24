import React from 'react'

import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";

import { Link } from "react-router-dom";

import "./Register.css";


const Register = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

  return (
    <div className='pagina_cadastro'>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Faça seu Cadastro</h1>

                <div className='container_input'>
                  <FaUser className='icon'/>
                  <input type="text" placeholder='Crie seu Username.' onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className='container_input'>
                  <AiOutlineMail className='icon'/>
                  <input type="email" placeholder='Digite seu Email.' onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='container_input'>
                  <FaLock className='icon'/>
                  <input type="password" placeholder='Crie uma Senha.' onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className='container_input'>
                  <FaLock className='icon'/>
                  <input type="password" placeholder='Repita a Senha.' onChange={(e) => setPasswordAgain(e.target.value)}/>
                </div>

                <button>Cadastrar</button>

                <div className='login_link'>
                  <p>Realize o <Link to="/">Login</Link></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Register
