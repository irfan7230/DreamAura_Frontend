import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import DreamScape from './components/home';
import Features from './components/features';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Dashboard from './components/profile';
import DreamPrompt from './components/dreamprompt';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [userData, setUserData] = useState(null);
  const [isAssistantExpanded, setAssistantExpanded] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const commands = [
    {
      command: 'hello',
      callback: () => speak("Hello, I am Smith, your voice assistant."),
    },
    {
      command: 'how are you',
      callback: () => speak("I am doing well, thank you! How can I assist you today?"),
    },
    {
      command: 'open next page',
      callback: () => {
        // Navigate to DreamPrompt route or display it if in the same component
        window.location.href = '/Features';
        speak("Opening the features of the application.");
      },
    },
    {
      command: 'open profile page',
      callback: () => {
        
        if(isLoggedIn){
          window.location.href = '/profile';
          speak("Opening the your profile.");
        }
        else{
          speak("Sorry I can't, Please Sign In.")
        }
      },
    },
    {
      command: 'open dream prompt',
      callback: () => {
        try{
          if(isLoggedIn){
        window.location.href = '/dreamprompt';
        speak("Opening the prompting page, you can type your prompt here.");
      }
      } catch{
        speak("Sorry I can't, Please Sign In.")
      }
      },
    },
    // Add more commands as needed
  ];
  

  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    commands,
    onResult: (result) => {
      // Check if the spoken command matches any defined commands
      const spokenCommand = result[0].transcript.toLowerCase();
      const recognizedCommand = commands.some(command => spokenCommand.includes(command.command));
      if (!recognizedCommand) {
        speak("I can't recognize that command.");
      }
    },
  });

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; 
    window.speechSynthesis.speak(speech);
  };

  
  const toggleAssistant = () => {
    setAssistantExpanded(!isAssistantExpanded);
    if (!isAssistantExpanded) {
      speak("Hello, I am Smith, your voice assistant. You can say 'hello', 'how are you', or 'open next page'.");
      SpeechRecognition.startListening({ continuous: true }); 
      setIsListening(true); 
    } else {
      SpeechRecognition.stopListening(); 
      setIsListening(false); 
    }
  };

  const handleLoginToggle = () => {
    setLoginOpen(!isLoginOpen);
  };

  const toggleSignUp = () => {
    setIsSignUp(true);
  };

  const toggleSignIn = () => {
    setIsSignUp(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginOpen(false); 
  };

 

  return (
    <Router>
      <div className={`App ${isAssistantExpanded ? 'blur-background' : ''}`}>
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-800">
                <FontAwesomeIcon icon={faMoon} className="text-blue-500" /> DreamAura
              </div>
            </div>
            <nav className="space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
              <Link to="/Features" className="text-gray-600 hover:text-gray-800">Features</Link>
              {isLoggedIn ? (
                <Link to="/profile" className="text-gray-600 hover:text-gray-800">Profile</Link>
              ) : (
                <button onClick={handleLoginToggle} className="text-gray-600 hover:text-gray-800">Login</button>
              )}
            </nav>
          </div>
        </header>
        <div className={`ai-assistant ${isAssistantExpanded ? 'expanded' : ''}`} onClick={toggleAssistant}>
            <div className="inner-sphere"></div>
        </div>
        {isListening && ( // Show message when listening
          <div className="listening-message">
            Listening for commands...
          </div>
        )}

        {/* Pop-up Login Form with transition */}
        {isLoginOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-400">
            <div className="bg-white p-6 rounded-lg shadow-lg relative transform transition-transform duration-400 ease-in-out">
              <button
                onClick={handleLoginToggle}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl"
              >
                &times; {/* Close button */}
              </button>

              {isSignUp ? (
                <SignUp toggleSignIn={toggleSignIn} />
              ) : (
                <SignIn toggleSignUp={toggleSignUp} onLoginSuccess={handleLoginSuccess} />
              )}
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<DreamScape isLoggedIn={isLoggedIn}/>} />
          <Route
          path="/dreamprompt"
          element={
            isLoggedIn ? (
              <DreamPrompt />
            ) : ( <></>
            )
          }
          />
          <Route path="/Features" element={<Features />} />
          <Route path="/profile" element={isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} /> : <DreamScape />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
