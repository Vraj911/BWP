import React from 'react'
import { Link } from 'react-router-dom'
function Activity() {
  return (
    <div className='flex flex-col items-center  min-h-screen'>
  <Link to='/create'>
  <div className='px-6 py-3 w-full rounded-md bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition'>
          ➕ Create Post
        </div>
  </Link>
  <div className='cursor-pointer hover:underline font-bold mt-4 text-2xl'>History</div>
</div>

  )
}

export default Activity