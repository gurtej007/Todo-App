import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 
function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    try {
      const data = await fetch("http://localhost:3400/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      if(data.ok){
        const result = await data.json();
        localStorage.setItem("token", JSON.stringify(result));
        navigate("/");
      }
      else throw new Error("Invalid credentials")
     
    } catch (err) {
      alert(err)
      setCredentials({ email: "", password: "" });
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div style={{ height: "fit-content" }}>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ margin: "200px 600px", border: "1px solid black" }}>
        <span style={{ fontSize: "40px" }}>LOGIN</span>
        <form onSubmit={handleSubmit}>
          <div className='my-2' style={{ paddingTop: "30px" }}>
            <label htmlFor="inputEmail" className='mx-2'>Email</label>
            <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Email" value={credentials.email} onChange={onChange} />
          </div>
          <div className='my-2'>
            <label htmlFor="inputPassword4" className='mx-2'>Password</label>
            <input type="password" className="form-control" id="inputPassword4" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
          </div>
         
          <div style={{ paddingBottom: "40px", marginTop: "25px" }}>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login