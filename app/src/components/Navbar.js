import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      {!localStorage.getItem('token') ? (
        <>
          <Link className="btn btn-outline-success my-2 my-sm-0" to='/Signup'>Signup</Link>
          <Link className="btn btn-outline-success my-2 my-sm-0 mx-3" to='/Login'>Login</Link>
        </>
      ) : (
        <Link className="btn btn-outline-success my-2 my-sm-0" onClick={handleClick} to='/'>Sign Out</Link>
      )}
    </nav>
  );
}

export default Navbar;
