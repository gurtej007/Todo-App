import React, { useState } from 'react'
// import Navbar from './Navbar.js';
import {useNavigate} from 'react-router-dom'
// import  Dashboard from './Dashboard.js';
//eslint 
function Signup() {

  let navigate=useNavigate();
  const [credentials,setcredentials] = useState({email:"",username:"",password:""});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password } = credentials;
    // const jsondata = {'email':email,'username':username,'password': password }
    try {
      const data = await fetch("http://localhost:3400/auth/signup",{
          method: "POST",
          headers: {
          'content-Type': 'application/json',
          },
          body: JSON.stringify({email,username,password})
      })
      
      let result =await data.json();
      if (result) {

        localStorage.setItem('token',JSON.stringify(result));
        navigate('/');
        console.log(result)        
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }

};


 const onChange=(e)=> {
     setcredentials({...credentials,[e.target.name]: e.target.value});
   
 }
  return (
    <div>
    <div style={{height:"fit-content"}} >
       <div className="d-flex flex-column  justify-content-center align-items-center" style={{margin:"200px 600px", border:"1px solid black"}}>
          <span style={{fontSize:"40px"}}>Register</span>
          <div className='my-2 ' style={{paddingTop:"30px"}}>
            <label htmlFor="inputEmail" className='mx-2'>Email</label>
           <input type="email"  className="form-control" id="inputEmail" name="email" placeholder="Email" value={credentials.email} onChange={onChange} />
          </div>
          <div className='my-2'>
            <label htmlFor="inputUser" className='mx-1'>Username</label>
           <input type="text" className="form-control"  id="inputUser" name="username" placeholder="Username" value={credentials.username} onChange={onChange} />
          </div>
          <div className='my-2'>
           <label htmlFor="inputPassword4" className='mx-2'>Password</label>
           <input type="password" className="form-control"  id="inputPassword4" name="password" placeholder="Password" value={credentials.password} onChange={onChange}/>
          </div>
          
          <div style={{paddingBottom:"40px", marginTop:"25px"}}>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
          </div>
       </div>
    </div>
     
    </div>
  );
}

export default Signup;
