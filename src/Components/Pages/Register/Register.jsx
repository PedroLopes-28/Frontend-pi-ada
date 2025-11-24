import React from 'react'

import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

import { Link } from "react-router-dom";


const Register = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

  return (
    <div className='pagina_cadastro'>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    </div>
  )
}

export default Register
