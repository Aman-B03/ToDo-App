import React from 'react'

const navbar = () => {
  return (
    <div className='flex justify-around gap-20 w-full bg-orange-300 sm:h-10 h-15 py-1 text-xl'>
      <div className="logo font-bold">X-Manager</div>
      <div className="content">Manage Your Daily Tasks !</div>
    </div>
  )
}

export default navbar