import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import dreamImage from './img/signin.jpg'; 
import { auth } from './../config/firebaseConfig';

function SignIn({ toggleSignUp, onLoginSuccess }) { 
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        alert("Sign-in successful!");
        onLoginSuccess(); 
      } else {
        alert("Please verify your email before signing in.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row transform transition-transform duration-400 ease-in-out opacity-100 scale-100">
      <div className="md:w-1/2 hidden md:block">
        <img
          src={dreamImage}
          style={{ width: '450px', height: '500px' }}
          alt="DreamsAura"
          className="object-cover h-full rounded-l-lg"
        />
      </div>
      <div className="md:w-1/2 p-6 bg-white rounded-r-lg">
        <h2 className="text-3xl font-bold mb-2">SignIn</h2>
        <p className="text-gray-600 mb-6">Unlock your dreams with us tonight.</p>
        <div className="mb-4">
          <label className="block text-gray-700">Enter your dream email</label>
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon icon={faMoon} className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Enter your dream password</label>
          <div className="relative">
            <input
              type={passwordShown ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon 
              icon={passwordShown ? faEyeSlash : faEye} 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-3 text-gray-400 cursor-pointer" 
            />
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-gray-700">Remember me</span>
          </label>
          <a href="#" className="text-blue-500" onClick={handleForgotPassword}>Retrieve dream password</a>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4" onClick={handleSignIn}>Dream in</button>
        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-500 mx-2">-- or --</span>
        </div>
        <p className="text-center text-gray-500">Create a dream account. <a onClick={toggleSignUp} className="text-blue-500 cursor-pointer">Sign up</a></p>
      </div>
    </div>
  );
}

export default SignIn;
