import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const registerUser = async (e) => {
        e.preventDefault();
        if(!name || !email || !password){
            return alert("Please enter all the fields!")
        }
       
        
        try {
            setLoading(true)
            const user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            //console.log(user);
            alert("Signed Up Successfully!")
            navigate("/login")
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }

  }

  return (
    <>
    {loading ? <div className='h-screen bg-blue-100 flex justify-center items-center'><span className="loader"></span></div> :
    <div className='bg-blue-50 flex justify-center items-center h-screen'>
    <div className='bg-white rounded-lg shadow-xl flex justify-center items-center flex-col px-10 py-14 gap-4'>
          <p className='text-3xl font'><span className="text-blue-600">Note</span>Wise</p>
          <input type='text' className='font text-lg px-8 py-2 border-2 rounded-lg outline-none transition-all transition-duration-500 shadow-sm focus:shadow-xl focus:border-2 focus:border-blue-600' placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} ></input>
          <input type='email' className='font text-lg px-8 py-2 border-2 rounded-lg outline-none transition-all transition-duration-500 shadow-sm focus:shadow-xl focus:border-2 focus:border-blue-600' placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} ></input>
          <input type='password' className='font text-lg px-8 py-2 border-2 rounded-lg outline-none transition-all transition-duration-500 shadow-sm focus:shadow-xl focus:border-2 focus:border-blue-600' placeholder='Enter your Password'  onChange={(e) => setPassword(e.target.value)}></input>
          <button className='font bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all transition-duration-500 outline-none px-6 py-2 rounded-lg border-none hover:shadow-xl text-white hover:text-black' id='LoginBtn' onClick={registerUser} >SIGN UP</button>
          <p className='text-sm font'>Already have account? <Link to="/login" className='text-blue-500'>Login</Link> here</p>
    </div>
</div>}
    
    </>
  )
}

export default Signup