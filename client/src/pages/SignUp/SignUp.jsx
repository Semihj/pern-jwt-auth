import  { useState } from 'react'
import "./SignUp.css"
import { Link, useNavigate } from 'react-router-dom'
export default function SignUp() {
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
            const res = await fetch("/api/auth/register",{
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
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(error)
      return (
    <div className='sign-up' >
        <div className="wrapper"> 
         <h1>Register</h1>
        <form onSubmit={handleSignIn} >
        <div className="container">
            <label >Name</label>
            <input name='name' type="text" placeholder='John Doe' onChange={handleChange} />
        </div>
        <div className="container">
            <label >Email</label>
            <input name='email' type="email" placeholder='example@gmail.com' onChange={handleChange} />
        </div>
        <div className="container">
            <label >Password</label>
            <input name='password' type="password" placeholder='*****' onChange={handleChange}/>
        </div>
        {error && <p className='error' >{error}</p> }
        <button>
            Sign Up
        </button>

      </form>
      <Link to={"/"} className='link' >Have an account?</Link>
      </div>
    </div>
  )
}
