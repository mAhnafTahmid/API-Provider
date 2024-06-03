import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [tokens, setTokens] = useState([])
  const navigate = useNavigate()

  const handleCreateToken = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('jwt')
    try {
      const response = await fetch('http://localhost:3501/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const data = await response.json()
        setTokens(data.tokens)
        alert('Your token has been generated successfully!')
      }
      else {
        localStorage.removeItem('jwt')
        localStorage.removeItem('email')
        alert('Your authorization token has expired! Please login again!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message)
      alert('Unable to generate token!')
    }
  }



  return (
    <div className='flex flex-col bg-gray-500 w-full min-h-screen items-center'>
      <header className="text-black w-full py-4 text-5xl text-center">
        Profile Page
      </header>
      <div className='w-full flex flex-col items-center text-white bg-black'>
        <h2 className="sm:w-1/3 w-4/5 text-4xl text-center py-5 font-bold">
          Need Access To Our Resources? <span className='text-indigo-700'>Create A Token And Access</span> Our Resources!
        </h2>
      </div>
      <div className="flex flex-row w-full flex-grow">
        <div className="w-2/3 bg-black text-white flex flex-col items-center min-h-full">
          lala
        </div>
        <div className="w-1/3 text-white bg-black flex flex-col items-center min-h-full">
          <div className="flex flex-col border border-gray-500 rounded-2xl p-4 mt-8 mx-4 items-center sm:mx-20">
            <h2 className="text-purple-400 text-center text-2xl text-bold">
              Genrate your token by pressing the button below! 
            </h2>
            <button className="border-none rounded-full bg-white text-black py-3 px-4 mx-auto mt-6 mb-4 focus:outline-none hover:bg-purple-700 hover:text-white focus:bg-purple-700 focus:text-white"
            onClick={(e) => {handleCreateToken(e)}}
            >
              Create Token
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile