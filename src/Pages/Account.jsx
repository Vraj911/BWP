import React from 'react'
import { auth,database } from '../Firebase/firebase';
import { useState, useEffect } from 'react';
import { getUser, UpdateUser } from '../Firebase/users';
import { deleteUser } from 'firebase/auth';
import { remove,ref } from 'firebase/database';
import History from '../Components/History';
import { Link } from 'react-router-dom';
function Account() {
  const [body, setBody] = useState('');
  const [username, setUsername] = useState('');
  async function deleteAcc() {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;
    try {
      const userName=auth.currentUser.displayName;
      // 1. Delete from Realtime Database
     
      await remove(ref(database, `users/${userName}`));
      await remove(ref(database,'emailtouser'+auth.currentUser.email.replace(/\./g, "_")));
      // 2. Delete from Firebase Auth
      await deleteUser(auth.currentUser);

      alert("Account deleted successfully.");
      // Redirect or update UI here if needed
    } catch (error) {
     
      alert("Failed to delete account. You might need to reauthenticate.");
    }
  }
  useEffect(() => {
    const init = async () => {
      const tusername = auth.currentUser.displayName;
      setUsername(tusername);
      let temp = await getUser(tusername);

      if (temp.bio) setBody(temp.bio);
    }
    init();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    UpdateUser(username, { bio: body });
    window.location.href = '/';
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          placeholder="Enter bio"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="4"
          className="border font-secondary placeholder:text-text-secondary text-text-secondary px-4 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-surface  text-white px-4 py-2 rounded hover:bg-background"
        >
          Save
        </button>

      </form>
      <Link to='/change-username'
          className="bg-surface w-full block my-2 text-center text-white px-4 py-2 rounded hover:bg-background"
        >
          Change Username
        </Link>
      <History />
      
    
    </>
  )
}

export default Account