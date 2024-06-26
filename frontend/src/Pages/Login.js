import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const isUserSignedIn = !!localStorage.getItem('jwt')
    if (!isUserSignedIn) {
        try {
            const response = await fetch('http://localhost:3501/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (response.ok) {
                const data = await response.json()
                const token = data.token 
                localStorage.setItem('email', email)
                localStorage.setItem('jwt', token) 
                setEmail('')
                setPassword('')
                console.log('Login Successful!')
                alert('Login Successful!')
                navigate('/profile')
                window.location.reload()
            }
            else {
                alert('Unable to login!')
                console.log('Unable to login!')
            }
        } catch (error) {
            console.log('Unable to connect to server', error)
        }
    }
    else {
        alert('Need to sign-out before logging in to another account')
    }
    
  }


  return (
    <div className='flex items-center justify-center bg-gray-500 m-auto min-h-screen'>
        <div className=" border rounded-lg border-gray-500 bg-black shadow-2xl w-2/3 sm:w-1/4 min-h-[50%] py-10">
            <h1 className="text-3xl text-center text-white py-4">Login</h1>
            <div className='flex flex-col w-3/4 mx-auto'>
                <label className="text-left text-white pr-15 pt-5 pb-2">Email</label>
                <input 
                    type="text" 
                    value={email}
                    className="w-full py-1.5 border rounded-lg border-gray-400 text-left px-3 mx-auto"
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <label className="text-left text-white pr-15 pt-5 pb-2">Password</label>
                <input 
                    type="password" 
                    value={password}
                    className="w-full py-1.5 border rounded-lg border-gray-400 text-left px-3 mx-auto mb-4"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <button 
                    className="bg-white text-black border rounded-full px-6 py-3 hover:bg-gray-500 hover:text-white mx-auto mt-7 focus:outline-none focus-visible:bg-gray-500 focus-visible:text-white shadow focus-visible:shadow-inner"
                    onClick={(e) => {handleLogin(e)}}
                >
                    Login
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default Login