import React from 'react'
import Sidebarcomponent from './Sidebarcomponent'
import Sidebarcontent from './Sidebarcontent'
import { auth } from '../Firebase/firebase'
import { useEffect,useState } from 'react'
function Sidebar({setSidebar}) {
  const [username,setUsername]=useState('');
   
  useEffect(()=>{
    setUsername(auth.currentUser.displayName);
  },[]
  )
  const closeSidebar = ()=>{

  }
  return (
    <>

      
    <div className=' fixed h-screen w-[150px] bg-sidebar flex flex-col items-center'>
    
      <div className='text-xl font-bold font-primary text-text-secondary'>{username}</div>
     <ul onClick={closeSidebar}>
    {Sidebarcontent.map((res,index) =>
      {
     return <Sidebarcomponent key={index} logo={res.logo} name={res.name} link={res.link} />
    }
    )}
     </ul>

    </div>
    </>
  )
}

export default Sidebar