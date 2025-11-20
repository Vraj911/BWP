import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../Firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { UserExists,CreateUser } from '../Firebase/users';
import { Loader2 } from 'lucide-react';


function Signup() {
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userExists = await UserExists(username);
      if (userExists) {
        toast("USERNAME NOT AVAILABLE",{position:'top-center'});
        setLoading(false);
        return;
      }

      await CreateUser(username, email);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      console.log("Custom user ID set in Firebase Auth!");
      navigate("/");

    } catch (error) {
      console.error("Error during sign-up:", error);
      alert(error.message);
    }
    setLoading(false);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
    
      <form
        onSubmit={handleSubmit}
        className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm"
      >
         <h1 className='text-red-400'>Note: Only your username will be visible to other users</h1>
        <h2 className="text-2xl font-bold mb-6 text-center text-text-primary font-primary">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username(Cant be changed later)"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full font-secondary px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 font-secondary mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        />

       {loading?
       <Loader2 className="w-full h-6 animate-spin  text-blue-500" />
       :
        <button
          type="submit"
          className="w-full bg-blue-600 font-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>}
        <Link to={"/login"}><div className='flex justify-center h-full text-blue-500'>Log In</div></Link>
    <div class="text-sm font-bold text-3xl text-text-primary italic p-2 ">
    Suggestion: Dont use your real name as username
</div>

      </form>

    </div>
  );
}

export default Signup;
