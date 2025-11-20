import React, { useState,useEffect } from 'react'
import { auth } from '../Firebase/firebase';
import { Loader2 } from 'lucide-react';
import { changeUsername } from '../Firebase/users';

function ChangeUsername() {
    const [username,setUsername]=useState('');
    const [loading,setLoading]=useState(false);
    
    useEffect(() => {
      setUsername(auth.currentUser.displayName);
      
    }, [])
    const Save =async(e)=>{
      try{
       // e.preventDefault();
        const  initialUsername=auth.currentUser.displayName;
      setLoading(true);
      const email=auth.currentUser.email;
      await changeUsername(email,initialUsername,username,auth.currentUser);
      console.log("Username changed");
      alert("Username changed");
      setLoading(false);
      }
      catch(err)
      {
        console.log(err);
      }
      
    }
  return (
   <>
   <div className='flex flex-col items-center'>
    <h1 className='text-white text-2xl font-primary'>Set Username</h1>
    <form >
    <input value={username}
    type='text'
     onChange={(e)=>{setUsername(e.target.value)}}
     className='border-white text-white'
     required/>
    {loading?
    <Loader2 className='w-full h-6 animate-spin text-blue-500'/>
    :
      <button className='bg-surface h-10 w-20 rounded-2xl
     text-white cursor-pointer
      hover:bg-background'
      onClick={Save}>Save</button>}
    </form>
   </div>
   </>
  )
}

export default ChangeUsername