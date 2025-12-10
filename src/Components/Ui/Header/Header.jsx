import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import "./Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  return (
  <div className='container_header'>
    <header>
      <h1>π-adas para você, engraçadinho.</h1>

      {isLoggedIn && location.pathname !== "/" && location.pathname !== "/register" && (
        <div className='user_info'>
          <span className='user_name'>Olá {userName}, hahahaha!</span>
          <button className='logout_button' onClick={handleLogout}>Logout</button>
        </div>
      )}

    </header>
  </div>
)
}

export default Header