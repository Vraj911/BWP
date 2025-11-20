import {useEffect} from 'react'
import { auth } from '../Firebase/firebase'
import { sawGeneralNotifications } from '../Firebase/notifications';

function Notifications() {
   const setSeen = async ()=>{
const email= auth.currentUser.email;
  await sawGeneralNotifications(email);
   
   }
   useEffect(() => {
     setSeen();
   }, [])
    
  return (
    <div>
        <div className='card bg-surface m-2 p-2'>
        <h1 className='text-2xl'>Latest Update</h1>
        <ul className="list-disc ml-5">
          <li>
            Notes Sections added! dm me if you want to contribute your notes.Eventually notes of every dept will be added
          </li>
            <li className=''>You can now change your username,yay!
                My Account>ChangeUsername
            </li>
        </ul>
        </div>
    </div>
  )
}

export default Notifications