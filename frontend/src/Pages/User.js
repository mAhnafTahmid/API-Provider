import React from 'react'
import { useState } from 'react'

const User = () => {
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [retrivedInfo, setRetrivedInfo] = useState('')

  const handleApiAccess = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        })
        if (response.ok) {
            const data = await response.json();
            setRetrivedInfo(data)
            console.log(data)
            alert('Api accessed successfully!')
        }
        else {
            alert('Cannot access the api!')
            console.log('Error in using the api! Token has expired or is wrong or url is wrong!')
        }
    } catch (error) {
        console.log('Unable to connect to server', error)
    }
  }


  return (
    <div className='flex items-center justify-center bg-gray-500 m-auto min-h-screen'>
        <div className=" border rounded-lg border-gray-500 bg-black shadow-2xl w-2/3 sm:w-1/4 min-h-[50%] py-10">
            <h1 className="text-3xl text-center text-white py-4">Api Use Interface</h1>
            <div className="flex justify-center flex-col">
                <h2 className="text-white text-center mb-3">Number of users</h2>
                <input 
                    type="text"
                    value={retrivedInfo}
                    className='text-black border border-blue-500 border-3 shadow-2xl py-2 px-3 rounded-lg focus:outline-none mx-auto w-1/5 text-center'
                    readOnly
                />
            </div>
            <div className='flex flex-col w-3/4 mx-auto'>
                <label className="text-left text-white pr-15 pt-5 pb-2">Enter Api URL</label>
                <input 
                    type="text" 
                    value={url}
                    className="w-full py-1.5 border rounded-lg border-gray-400 text-left px-3 mx-auto"
                    onChange={(e) => {setUrl(e.target.value)}}
                />
                <label className="text-left text-white pr-15 pt-5 pb-2">Enter Token</label>
                <input 
                    type="text" 
                    value={token}
                    className="w-full py-1.5 border rounded-lg border-gray-400 text-left px-3 mx-auto mb-4"
                    onChange={(e) => {setToken(e.target.value)}}
                />
                <button 
                    className="bg-white text-black border rounded-full px-6 py-3 hover:bg-gray-500 hover:text-white mx-auto mt-7 focus:outline-none focus-visible:bg-gray-500 focus-visible:text-white shadow focus-visible:shadow-inner"
                    onClick={(e) => {handleApiAccess(e)}}
                >
                    Use Api
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default User