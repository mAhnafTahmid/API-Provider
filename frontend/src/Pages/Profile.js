import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Profile = () => {
  const [tokens, setTokens] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('jwt')

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch('http://localhost:3501/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json()
          setTokens(data)
        }
        else {
          localStorage.removeItem('jwt')
          localStorage.removeItem('email')
          navigate('/login')
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchTokens()
  })

  const handleCreateToken = async (e) => {
    e.preventDefault()
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
        setTokens(data)
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

  const handleCopyToken = () => {
    alert('Token copied to clipboard')
  };



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
          <div className="mt-8 border border-white rounded-lg sm:w-3/5 w-4/5 py-4 mx-4 justify-center">
            <h2 className="text-purple-700 text-3xl text-center px-3">
              Copy a token and send it in the body of your request by naming the key as <span className='text-red-700'>'token'</span>.  
            </h2>
            <h3 className="text-red-500 text-1xl text-center px-8 mt-3">
              Note: The tokens will expire after 1 hour from when it was created.
            </h3>
            {tokens.length !== 0 ? (
              tokens.map((token) => (
                <div className="flex sm:flex-row flex-col py-2 px-3 w-4/5 items-center mx-auto justify-start">
                  <input 
                    type="text"
                    value={token}
                    className='text-black border border-blue-500 border-3 shadow-2xl py-2 px-3 rounded-lg flex-grow focus:outline-none'
                    readOnly
                  />
                  <CopyToClipboard text={token} onCopy={handleCopyToken}>
                    <button className="border-none rounded-3xl bg-gray-400 text-black py-2 px-3 mx-3 focus:outline-none hover:bg-purple-400 hover:text-indigo-900 focus:bg-purple-400 focus:text-indigo-900"
                    >
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              ))
            ) : (
              <h2 className="w-full py-3 px-5 text-3xl text-pink-700 text-center">
                No Tokens Have Been Created! 
              </h2>
            )}
          </div>
        </div>
        <div className="w-1/3 text-white bg-black flex flex-col items-center min-h-full">
          <div className="flex flex-col border border-gray-500 rounded-2xl p-4 mt-8 mx-4 items-center sm:mx-20">
            <h2 className="text-purple-400 text-center text-2xl text-bold">
              Use our API to send a POST request! Keep in mind a token is needed to use the API.  
            </h2>
            <div className="w-4/5 h-0.5 bg-white m-4"></div>
            <input 
              type="text"
              value={'http://localhost:3501/api'}
              className='text-black border border-blue-500 border-3 shadow-2xl py-2 px-3 rounded-lg mx-auto focus:outline-none my-1'
              readOnly
            />
            <div className="w-4/5 h-0.5 bg-white m-4"></div>
            <h2 className="text-pink-700 text-center text-2xl text-bold">
              Genrate your token by pressing the button below! 
            </h2>
            <div className="w-4/5 h-0.5 bg-white mt-4"></div>
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