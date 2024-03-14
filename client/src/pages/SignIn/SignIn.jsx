import  { useState } from 'react'
import "./SignIn.css"
import { Link, useNavigate } from 'react-router-dom'
export default function SignIn() {
    const [formData,setFormData] = useState({})
    const [error,setError] = useState()
    const navigate = useNavigate()

    console.log(formData)
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json();
            if(res.status !== 200) {
                setError(data) 
             } else {
               navigate("/")
             }
        } catch (error) {
            console.log(error)
        }
    }
      return (
    <div className='sign-in' >
        <div className="wrapper"> 
         <h1>Login</h1>
        <form onSubmit={handleSignIn} >
        <div className="container">
            <label >Email</label>
            <input name='email' required type="email" placeholder='example@gmail.com' onChange={handleChange} />
        </div>
        <div className="container">
            <label >Password</label>
            <input name='password' required type="password" placeholder='*****' onChange={handleChange}/>
        </div>
        {error && <p className='error' > {error} </p> }
        <button>
            Sign In
        </button>

      </form>
      <Link to={"/register"} className='link' >Don't have an account?</Link>
      </div>
    </div>
  )
}
