import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else {
        alert("Error: " + error.message);
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate("/")
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-surface p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center font-primary text-text-primary">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border font-secondary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-primary py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <Link to={"/signup"}><div className='flex justify-center h-full text-blue-500'>Signup</div></Link>
        <div className='w-full flex justify-center cursor-pointer font-bold' onClick={ForgotPassword}>Forgot Password</div>
      </form>

    </div>
  );
}

export default Login;
