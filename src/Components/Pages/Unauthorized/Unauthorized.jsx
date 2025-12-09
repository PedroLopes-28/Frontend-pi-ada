import React from 'react'
import { Link } from 'react-router-dom'
import './Unauthorized.css'

const Unauthorized = () => {
  return (
    <div className='pagina_unauthorized'>
      <div className='container_unauthorized'>
        <h1>Acesso Negado</h1>
        <p>Opa, engraçadinho! Tentando entrar sem login?</p>
        <p>As piadas são exclusivas para piadistas cadastrados, bobão!</p>
        <p>Volta pro login!</p>
        <Link to="/" className='btn_voltar'>Fazer Login</Link>
      </div>
    </div>
  )
}

export default Unauthorized
