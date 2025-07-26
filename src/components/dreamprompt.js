import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { auth, database} from './../config/firebaseConfig';
import { ReactMediaRecorder } from "react-media-recorder";
import { ref, get, push, set } from "firebase/database";
import dreamgirl from './img/girldream.png';
import dreamboy from './img/boydream.png';
import FurtherReading from "./FurtherReading";

const DreamPrompt = () => {
  const [record, setRecord] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [dreamImageUrl, setDreamImageUrl] = useState(null);

  const [summary, setSummary] = useState(""); 
  const [psychologicalMeaning, setPsychologicalMeaning] = useState(""); 
  const [mentalHealth, setMentalHealth] = useState(""); 
  const [physicalHealth, setPhysicalHealth] = useState(""); 
  const [diseaseIndications, setDiseaseIndications] = useState("");
  const [dreamConveyMessage, setDreamConveyMessage] = useState(""); 
  const [sleepQuality, setSleepQuality] = useState("");
  const [lucidDream, setLucidDream] = useState("");
  const [additionalResources, setAdditionalResources] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [showImageModal, setShowImageModal] = useState(false);

const handleOpenImageModal = () => {
    setShowImageModal(true);
};

const handleCloseImageModal = () => {
    setShowImageModal(false);
};


  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.interimResults = true;
    recognitionInstance.continuous = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(currentTranscript);
    };

    recognitionInstance.onend = () => {
      if (record) {
        recognitionInstance.start();
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, [record]);

  const startRecording = () => {
    if (recognition) {
      setRecord(true);
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      setRecord(false);
      recognition.stop();
    }
  };

  const formatText = (text) => {
  if (typeof text !== 'string') {
    return text; 
  }
  return text.replace(/\*\*(.*?)\*\*/g, '');
}; 

  const cleanText = (text) => text.replace(/###/g, "");

  const handleSubmit = async () => {
    setIsSubmitting(true);
  
    const speech = new SpeechSynthesisUtterance();
    speech.text = "Processing...";
    speech.pitch = 1.2;
    speech.rate = 0.6;
    speech.volume = 1;
    speech.lang = "en-US";
  
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find((voice) => 
      (voice.name.includes("Female") || voice.name.includes("woman")) && voice.lang === "en-US"
    );
    speech.voice = femaleVoice || voices[0]; 
    window.speechSynthesis.speak(speech);
  
    if (!transcript) {
      alert("Please enter or record a dream before submitting.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Fetch current user
      const user = auth.currentUser;
      if (!user) {
        alert("No user is signed in.");
        setIsSubmitting(false);
        return;
      }
  
      // Get the current user's data from Firebase
      const userDataRef = ref(database, 'users/' + user.uid);
      const userDataSnapshot = await get(userDataRef);
      const userData = userDataSnapshot.val();
  
      if (!userData) {
        alert("User data not found.");
        setIsSubmitting(false);
        return;
      }
  
      // Send dream to the backend for interpretation
      const response = await fetch("http://localhost:5000/submit_dream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ dream: transcript, dreamerID: user.uid}), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred.");
      }
  
      const data = await response.json();
  
      if (data.error) {
        alert(`Error: ${data.error}`);
        setIsSubmitting(false);
        return;
      }
  
      window.speechSynthesis.cancel();
  
      setSummary(formatText(data.summary || ""));
      setPsychologicalMeaning(formatText(data.psychological_meaning?.insights.join("\n") || ""));
      setMentalHealth(formatText(data.mental_health_status?.insights.join("\n") || ""));
      setPhysicalHealth(formatText(data.physical_health?.insights.join("\n") || ""));
      setDiseaseIndications(formatText(data.disease_indications?.insights.join("\n") || ""));
      setDreamConveyMessage(formatText(data.dream_convey_message?.insights.join("\n") || ""));
      setSleepQuality(formatText(data.sleep_quality?.insights.join("\n") || ""));
      setLucidDream(formatText(data.lucid_dream?.insights.join("\n") || ""));
      setAdditionalResources(data.additional_resources?.links || []);
  
      // Create a new dream object with the updated interpretation data
      const updatedDream = {
        dreamerID: userData.dreamerID,
        name: userData.name,
        dreamPrompt: transcript,
        summary: formatText(data.summary || ""),
        psychologicalMeaning: formatText(data.psychological_meaning?.insights.join("\n") || ""),
        mentalHealth: formatText(data.mental_health_status?.insights.join("\n") || ""),
        physicalHealth: formatText(data.physical_health?.insights.join("\n") || ""),
        diseaseIndications: formatText(data.disease_indications?.insights.join("\n") || ""),
        dreamConveyMessage: formatText(data.dream_convey_message?.insights.join("\n") || ""),
        sleepQuality: formatText(data.sleep_quality?.insights.join("\n") || ""),
        lucidDream: formatText(data.lucid_dream?.insights.join("\n") || ""),
        additionalResources: data.additional_resources?.links || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      // Store the complete dream object in Firebase
      const dreamsRef = ref(database, 'users/' + user.uid + '/dreams');
      const newDreamRef = push(dreamsRef);
      await set(newDreamRef, updatedDream);
  
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting dream:", error);
      alert(`There was an error submitting your dream: ${error.message}`);
      setIsSubmitting(false);
    }
  };
  
  const handleTranscription = async (blob) => {
    // Replace this URL with your speech-to-text API endpoint
    const apiUrl = "https://your-speech-to-text-api.com/transcribe"; 

    const formData = new FormData();
    formData.append("file", blob);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const data = await response.json();
      setTranscript(data.transcription); // Assuming the API returns { transcription: "Your transcribed text" }
    } catch (error) {
      console.error("Error during transcription:", error);
      alert("Transcription failed. Please try again.");
    }
  };

  const handleVisualize = async () => {
    // Fetch current user
    const user = auth.currentUser;
    if (!user) {
      alert("No user is signed in.");
      return;
    }

    // Get the current user's data from Firebase
    const userDataRef = ref(database, 'users/' + user.uid);
    const userDataSnapshot = await get(userDataRef);
    const userData = userDataSnapshot.val();

    if (!userData) {
      alert("User data not found.");
      return;
    }
    if (!transcript) {
      alert("Please enter or record a dream before visualizing.");
      return;
    }
  
    setIsGeneratingImage(true);
  
    try {
      const response = await fetch("http://localhost:5000/generate_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dream: transcript, gender: userData.gender }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred during image generation.");
      }
  
      const data = await response.json();
      if (data.image_url) {
        setDreamImageUrl(data.image_url);
      } else {
        alert("Image generation failed. Please try again.");
      }
  
      setIsGeneratingImage(false);
  
    } catch (error) {
      console.error("Error generating dream image:", error);
      alert(`There was an error generating your dream image: ${error.message}`);
      setIsGeneratingImage(false);
    }
  };
  

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`min-h-screen w-full ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Theme Toggle Switch */}
        <div className="flex justify-end items-center mb-6">
        <label className="relative inline-block w-12 h-6">
  <input
    type="checkbox"
    onChange={toggleTheme}
    checked={theme === "light"}
    className="hidden"
  />
  <span
    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-${
      theme === "dark" ? "gray-300" : "gray-300"
    } rounded-full before:absolute before:bg-white before:h-4 before:w-4 before:rounded-full before:top-1 before:left-1 transition-transform ${
      theme === "light" ? "before:translate-x-6 bg-purple-500" : ""
    }`}
  ></span>
</label>
        </div>

        {/* Dream Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Your Dream</h2>
            <textarea
              className="w-full mt-2 p-4 border rounded-md text-black"
              placeholder="Describe your dream..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-purple-500 text-white py-3 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Dream"}
            </button>
            {/* Voice Prompting */}
            <ReactMediaRecorder
              audio
              render={({ status, startRecording, stopRecording }) => (
                <>
                  <button
                    onClick={startRecording}
                    className={`w-full mt-4 py-3 rounded-md ${status === 'recording' ? 'bg-red-500' : 'bg-purple-500'}`}
                    disabled={status === 'recording'}
                  >
                    <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
                    {status === 'recording' ? 'Recording...' : 'Start Recording'}
                  </button>
                  {status === 'recording' && (
                    <button
                      onClick={stopRecording}
                      className="w-full mt-4 py-3 rounded-md bg-red-500"
                    >
                      <FontAwesomeIcon icon={faStopCircle} className="mr-2" />
                      Stop Recording
                    </button>
                  )}
                </>
              )}
              onStop={(blob) => handleTranscription(blob)} // Call handleTranscription on stop
            />
          </div>

          {/* Interpretation Results */}
          <div>
          <h2 className="text-2xl font-semibold">Interpretation Results</h2>
          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Summary</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Summary</h3>
          <p>{cleanText(summary)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Psychological Meaning</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Psychological Meaning</h3>
          <p>{cleanText(psychologicalMeaning)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Mental Health Insights</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Mental Health Insights</h3>
          <p>{cleanText(mentalHealth)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Physical Health Insights</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Physical Health Insights</h3>
          <p>{cleanText(physicalHealth)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Disease Indications</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Disease Indications</h3>
          <p>{cleanText(diseaseIndications)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Dream Convey Message</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Dream Convey Message</h3>
          <p>{cleanText(dreamConveyMessage)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Sleep Quality</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Sleep Quality</h3>
          <p>{cleanText(sleepQuality)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Lucid Dream Exploration</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Lucid Dream Exploration</h3>
          <p>{cleanText(lucidDream)}</p>
          </div>
          )}

          {isSubmitting ? (
          <div className="mt-4">
          <h3 className="font-semibold">Additional Resources</h3>
          <div className="h-4 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 animate-pulse"></div>
          </div>
          ) : (
          <div className="mt-4">
          <h3 className="font-semibold text-black">Additional Resources</h3>
          <ul>
            {additionalResources.map((link, index) => (
            <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {link}
            </a>
            </li>
              ))}
          </ul>
          </div>
          )}
          
        </div>          
        </div>

        {/* Visualization Section */}
        <div className="mt-8">
          <button className="w-full bg-green-500 text-white py-3 rounded-md" id="visualizeBtn" onClick={handleVisualize} disabled={isGeneratingImage}>
            <FontAwesomeIcon icon={faEye} className="mr-2" /> {isGeneratingImage ? "Generating visual of dream..." : "Explore Your Dream Visualization"} 
          </button>
        </div>

        <>
    {dreamImageUrl && (
        <div className="dream-image-section">
          <br></br>
            <h3 className="text-black-800 font-semibold">Generated successfully, Press the button to view your visual...</h3>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleOpenImageModal}
            >
                View Full Image
            </button>
        </div>
    )}

    {/* Modal for displaying dream image */}
    {showImageModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 w-2/4 h-3/3 overflow-auto">
                <h3 className="text-lg font-bold mb-4">Dream Visualization</h3>
                <div className="flex justify-center">
                    <img 
                        src={dreamImageUrl} 
                        alt="Dream Visualization" 
                        style={{ maxWidth: "80%", maxHeight: "80%" }} 
                    />
                </div>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    onClick={handleCloseImageModal}
                >
                    Close
                </button>
            </div>
        </div>
    )}
</>

        <DreamSection title="Dream Interpretation Examples" cards={dreamCardsData} />
        <FurtherReading />
      </div>
    </div>
  );
};

const DreamCard = ({ imgSrc, title }) => (
  <div className="dream-card p-4 rounded-md shadow-sm flex items-center justify-center">
    <img src={imgSrc} alt={title} className="rounded-full w-36 h-36" />
    <span className="ml-2">{title}</span>
  </div>
);

const DreamSection = ({ title, cards }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {cards.map((card, index) => (
        <DreamCard key={index} imgSrc={card.imgSrc} title={card.title} />
      ))}
    </div>
  </div>
);

const dreamCardsData = [
  { imgSrc: dreamgirl, title: "Flying Dream" },
  { imgSrc: dreamboy, title: "Water Dream" },
];


export default DreamPrompt;
