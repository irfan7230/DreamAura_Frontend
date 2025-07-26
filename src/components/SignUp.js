import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ref, set } from 'firebase/database'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faMoon, faUser, faBirthdayCake, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { auth, database } from './../config/firebaseConfig'; 
import dreamImage from './img/signup.jpg'; 

function SignUp({ toggleSignIn }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState(''); 
  const [bloodGroup, setBloodGroup] = useState('');
  const [userRole, setUserRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordShown(!confirmPasswordShown);

  const generateDreamerID = () => Math.floor(100000 + Math.random() * 900000).toString();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidAge = (age) => {
    const ageNumber = parseInt(age, 10);
    return ageNumber >= 12 && ageNumber <= 100;
  };

  const handleNextStep = () => {
    if (step === 1 && (password !== confirmPassword)) {
      setErrorMessage("Passwords do not match.");
    } else if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
    } else {
      setErrorMessage('');
      setStep(step + 1);
    }
  };

  const handleSignUp = async () => {
    if (!name || !age || !dob || !bloodGroup || !userRole) {
      setErrorMessage("Please complete all fields.");
      return;
    }
    if (!isValidAge(age)) {
      setErrorMessage("Please enter a valid age between 12 and 100.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const dreamerID = generateDreamerID();
      const userData = {
        name,
        age,
        dob,
        email,
        dreamerID,
        bloodGroup,
        gender,
        userRole,
      };

      await set(ref(database, 'users/' + user.uid), userData);
      await sendEmailVerification(user);
      alert('Verification email sent! Please check your inbox.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 hidden md:block">
        <img
          src={dreamImage}
          style={{ width: '500px', height: '500px' }}
          alt="DreamAura"
          className="object-cover h-full rounded-l-lg"
        />
      </div>

      <div className="md:w-1/2 p-6 bg-white rounded-r-lg">
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-2">SignUp - Step 1</h2>
            <p className="text-gray-600 mb-6">Start your dream journey with us.</p>

            <div className="mb-4">
              <label className="block text-gray-700">Enter your email address</label>
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
              <label className="block text-gray-700">Enter your password</label>
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

            <div className="mb-4">
              <label className="block text-gray-700">Confirm your password</label>
              <div className="relative">
                <input
                  type={confirmPasswordShown ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="**********"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FontAwesomeIcon 
                  icon={confirmPasswordShown ? faEyeSlash : faEye} 
                  onClick={toggleConfirmPasswordVisibility} 
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer" 
                />
              </div>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg" onClick={handleNextStep}>Next</button><br></br>
            <div className="flex items-center justify-center mb-4">
            <span className="text-gray-500 mx-2">-- or --</span>
            </div>
            <p className="text-center text-gray-500">Already have an account? <a onClick={toggleSignIn} className="text-blue-500 cursor-pointer">Sign in</a></p>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold mb-2">SignUp - Step 2</h2>
            <p className="text-gray-600 mb-6">Tell us more about yourself.</p>

            <div className="mb-4">
              <label className="block text-gray-700">Enter your name</label>
              <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <FontAwesomeIcon icon={faUser} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Enter your age</label>
              <div className="relative">
              <input
                type="number"
                placeholder="Age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAge(e.target.value)}
              />
              <FontAwesomeIcon icon={faBirthdayCake} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Enter your date of birth</label>
              <div className="relative">
              <input
                type="date"
                placeholder=""
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setDob(e.target.value)}
              />
              <FontAwesomeIcon 
              icon={faCalendarAlt} 
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              />
            </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg" onClick={handleNextStep}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold mb-2">SignUp - Step 3</h2>
            <p className="text-gray-600 mb-6">Almost done!</p>

            <div className="mb-4">
              <label className="block text-gray-700">Select your blood group</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label className="block text-gray-700">Select your gender</label>
            <select
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setGender(e.target.value)} 
            >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
            </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Choose your role</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Researcher">Researcher</option>
                <option value="Artist">Artist</option>
                <option value="Engineer">Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Teacher">Teacher</option>
                <option value="Consultant">Consultant</option>
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
                <option value="Marketer">Marketer</option>
                <option value="Writer">Writer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg" onClick={handleSignUp}>Dream Up</button>
            <div className="flex items-center justify-center mb-4">
            <span className="text-gray-500 mx-2">-- or --</span>
            </div>
            <p className="text-center text-gray-500">If You Sign Up Successfully? <a onClick={toggleSignIn} className="text-blue-500 cursor-pointer">Sign in</a></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
