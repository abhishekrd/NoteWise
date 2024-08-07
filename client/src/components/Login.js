import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
     e.preventDefault();
     if(!email || !password){
       return alert("Please enter all the fields!")
     }
    try{
      setLoading(true)
      const userData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
     })
     
     if(userData.status === 401){
      return alert("Invalid Email or Password!")
     }
     const jsonUser = await userData.json();
     alert("Sign in Successful!");

     localStorage.setItem("jwt", jsonUser.token);
     localStorage.setItem("user", JSON.stringify(jsonUser.user))
     navigate("/create");

    }
    catch(err){
      console.log(err);
    }
    finally{
       setLoading(false)
    }  
    
  }

  return (
    <> 
    {loading ? <div className='h-screen bg-blue-100 flex justify-center items-center'><span className="loader"></span></div> :  <div className='bg-blue-50 flex justify-center items-center h-screen'>
        <div className='bg-white rounded-lg shadow-xl flex justify-center items-center flex-col px-10 py-14 gap-4'>
              <p className='text-3xl font'><span className="text-blue-600">Note</span>Wise</p>
              <input type='email' className='font text-lg px-8 py-2 border-2 rounded-lg outline-none transition-all transition-duration-500 shadow-sm focus:shadow-xl focus:border-2 focus:border-blue-600' placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)}></input>
              <input type='password' className='font text-lg px-8 py-2 border-2 rounded-lg outline-none transition-all transition-duration-500 shadow-sm focus:shadow-xl focus:border-2 focus:border-blue-600' placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)} ></input>
              <button className='font bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all transition-duration-500 outline-none px-6 py-1 rounded-lg border-none hover:shadow-xl text-white hover:text-black' id='LoginBtn' onClick={loginHandler}>LOGIN</button>
              <p className='text-sm font'>Don't have account? <Link to="/signup" className='text-blue-500'>Sign up</Link> here</p>
        </div>
    </div>}
   
    </>
  )
}

export default Login