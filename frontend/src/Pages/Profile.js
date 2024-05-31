import React from 'react'

const Profile = () => {
  return (
    <div className='flex flex-col bg-gray-500 w-full min-h-screen items-center'>
      <header className="text-black w-full py-4 text-5xl text-center">
        Profile Page
      </header>
      <div className="flex flex-row w-full flex-grow">
        <div className="w-2/3 bg-black text-white flex flex-col items-center min-h-full">
          Profile
        </div>
        <div className="w-1/3 text-black bg-white flex flex-col items-center min-h-full">
          haha
        </div>
      </div>
    </div>
  )
}

export default Profile