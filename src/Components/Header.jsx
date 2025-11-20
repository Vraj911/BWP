import React from 'react'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Bell ,Menu} from 'lucide-react';
import { auth } from '../Firebase/firebase';
import { hasSeenGeneralNotifications } from '../Firebase/notifications';
function Header({setSidebar}) {
  
  const [emoji,setemoji]=useState('🌸');
  const[notifications,setNotifications]=useState(false);
  let array=['🌸','💄','🫦','💀','🗿','💔','👀','😋','😍','😎','🔥','🫣','💦'];
  const initNoti = async ()=>{
    const email = auth.currentUser.email;
  const seen = await hasSeenGeneralNotifications(email);
  setNotifications(!seen); // if not seen, then show badge
  }
  useEffect(() => {
    initNoti();
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * array.length);
      setemoji(array[randomIndex]);
    }, 1000); // Every 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  function toggle(){setSidebar(prev=>!prev);}
  return (<div className="navbar h-20 fixed top-0 z-50 bg-header px-4 text-text-primary">
      {/* Left: MENU */}
      <div className="navbar-start">
        <button onClick={toggle} className="btn bg-surface text-text-primary font-primary h-10 min-h-10">
          <Menu/>
        </button>
      </div>

      {/* Center: Title */}
      <div className="navbar-center">
        <Link
        to='/' className="text-2xl md:text-3xl font-bold font-primary">
        GO  <br className="block sm:hidden" /> INDIA 
        </Link>
      </div>

      {/* Right: Bell + RULES */}
      <div className="navbar-end">
       <div className="relative cursor-pointer mx-2">
    <Link to='/notifications'> <Bell className="w-6 h-6 text-white" /> </Link> 
      {notifications && (
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-500 " />
      )}
    </div>
     
      </div>
    </div>
  )
}

export default Header