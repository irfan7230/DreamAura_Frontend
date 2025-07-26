import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { auth, database } from './../config/firebaseConfig'; 
import { ref, get } from "firebase/database"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { faEye, faHeart, faBrain, faMoon, faLungs, faAllergies, faVirus, faSyringe, faTint, faChevronRight, faExclamationCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import male from './img/male.jpg'
import female from './img/female.jpg'
const Dashboard = ({ isLoggedIn}) => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [upcomingDreams, setUpcomingDreams] = useState([]);
    const [dreams, setDreams] = useState([]);
    const [lastDreamDate, setLastDreamDate] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const [alerts, setAlerts] = useState([]);

    
    const [summary, setSummary] = useState("");
    const [psychologicalMeaning, setPsychologicalMeaning] = useState("");
    const [mentalHealth, setMentalHealth] = useState("");
    const [physicalHealth, setPhysicalHealth] = useState("");
    const [diseaseIndications, setDiseaseIndications] = useState("");
    const [dreamConveyMessage, setDreamConveyMessage] = useState("");
    const [sleepQuality, setSleepQuality] = useState("");
    const [lucidDream, setLucidDream] = useState("");
    const [additionalResources, setAdditionalResources] = useState([]);
    

  useEffect(() => {
    const fetchUserData = async (userId) => {
        try {
          
            const userRef = ref(database, 'users/' + userId);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setUserData(snapshot.val());
            }

           
            const dreamsRef = ref(database, 'users/' + userId + '/dreams');
            const dreamsSnapshot = await get(dreamsRef);
            if (dreamsSnapshot.exists()) {
                const dreamsList = Object.values(dreamsSnapshot.val());
                setDreams(dreamsList);

                if (dreamsList.length > 0) {
                    const lastDream = dreamsList[dreamsList.length - 1];
                    setLastDreamDate(lastDream.createdAt);

                    const lastDate = new Date(lastDream.createdAt);
                    const currentDate = new Date();
                    const timeDiff = Math.abs(currentDate - lastDate);
                    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    if (diffDays > 2) {
                        setAlerts(prevAlerts => [...prevAlerts, "Your last dream was logged more than 2 days ago. Start logging your dreams again!"]);
                    }
                }
            }
        
            const upcomingDreamsRef = ref(database, 'users/' + userId + '/upcoming_dreams');
            const upcomingDreamsSnapshot = await get(upcomingDreamsRef);
            if (upcomingDreamsSnapshot.exists()) {
                const upcomingDreamsList = Object.values(upcomingDreamsSnapshot.val());

                const lastTwoDreams = upcomingDreamsList.slice(-2);
                setUpcomingDreams(lastTwoDreams);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      }
    });
  }, []);


  const handleAnalyzeDream = async () => {
    try {
    
        const user = auth.currentUser;
        if (!user) {
            alert("No user is signed in.");
            return;
        }

        const dreamsRef = ref(database, 'users/' + user.uid + '/dreams');
        const dreamsSnapshot = await get(dreamsRef);
        if (dreamsSnapshot.exists()) {
            const dreamsList = Object.values(dreamsSnapshot.val());

            const lastDream = dreamsList[dreamsList.length - 1];

            setSummary(lastDream.summary || "");
            setPsychologicalMeaning(lastDream.psychologicalMeaning || "No psychological meaning available.");
            setMentalHealth(lastDream.mentalHealth || "No mental health insights available.");
            setPhysicalHealth(lastDream.physicalHealth || "No physical health insights available.");
            setDiseaseIndications(lastDream.diseaseIndications || "No disease indications available.");
            setDreamConveyMessage(lastDream.dreamConveyMessage || "No message conveyed by the dream.");
            setSleepQuality(lastDream.sleepQuality || "No sleep quality suggestions available.");
            setLucidDream(lastDream.lucidDream || "No lucid dream information available.");
            setAdditionalResources(lastDream.additionalResources || []);

            
            setShowModal(true);
        } else {
            alert("No dreams found in the database.");
        }
    } catch (error) {
        console.error("Error fetching dream data:", error);
        alert("There was an error fetching your dream data.");
    }
};

  const handleLogout = async () => {
    try {
        await signOut(auth); 
        navigate('/', { replace: true });
        isLoggedIn(false);
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

const handleCloseModal = () => {
    setShowModal(false);
};


  if (!userData) {
    return <div
    className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>;
  }
    const profileImage = userData.gender === 'Male' ? male : female;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto flex-1 px-4 py-8 grid grid-cols-4 gap-4">
                <section className="bg-gray-200 p-4 rounded-lg col-span-1">
                    <div className="flex flex-col items-center">
                        <img src={profileImage} style={{ width: '100px', height: '100px' }} alt="Profile " className="rounded-full mb-4"/>
                        <h2 className="text-lg font-bold">{userData.name}</h2>
                        <p className="text-gray-600">{userData.age} years, {userData.gender}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-gray-600 font-semibold">General Information</h3>
                        <p className="text-gray-600">Date of Birth</p>
                        <p className="text-gray-800">{userData.dob}</p>
                        <p className="text-gray-600">Dreamer ID</p>
                        <p className="text-gray-800">{userData.dreamerID}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-gray-600 font-semibold">Recent Dreams</h3>
                        <div className="flex space-x-2 mt-2">
                        {dreams.slice(-2).map((dream, index) => (
                        <span 
                        key={index} 
                        className="bg-white text-gray-800 px-3 py-1 rounded-full max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" 
                        title={dream.dreamPrompt || 'Unnamed Dream'} 
                        >
                        {dream.dreamPrompt || 'Unnamed Dream'}
                        </span>
                        ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-gray-600 font-semibold">Last Dream Date</h3>
                        <div className="bg-white p-2 rounded-lg mt-2">
                        <p className="text-gray-800">
                                {lastDreamDate ? new Date(lastDreamDate).toLocaleDateString() : 'No recent dreams logged'}{' '}
                                <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500" />
                            </p>
                            <p className="text-gray-600 text-sm">It has been a while since your last dream log. You should start tracking your dreams again to gain more insights.</p>
                        </div>
                    </div>
                </section>
                <section className="bg-gray-200 p-4 rounded-lg col-span-1">
                    <h3 className="text-gray-600 font-semibold">Upcoming Dreams</h3>
                    {upcomingDreams.length > 0 ? (
                        upcomingDreams.map((dream, index) => (
                            <div className="bg-white p-2 rounded-lg mt-2 flex justify-between items-center" key={index}>
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faMoon} className="text-gray-600 mr-2" /> {dream.title || 'Untitled Dream'}
                                </span>
                                <span className="text-gray-600">{dream.predicted_date || 'No Date'}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No upcoming dreams predicted.</p>
                    )}
                    <h3 className="text-gray-600 font-semibold mt-4">Recent Dream Analysis</h3>
                    <div className="bg-white p-2 rounded-lg mt-2 flex justify-between items-center">
                        <span className="flex items-center"><FontAwesomeIcon icon={faEye} className="text-gray-600 mr-2" /> Dream Analysis</span>
                        <span className="text-gray-600">Today</span>
                    </div>
                    <button className="bg-blue-200 text-blue-600 px-4 py-2 rounded mt-2 w-full" onClick={handleAnalyzeDream}>Analyze Dream</button>
                </section>
                {/* Modal for Dream Analysis */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-8 w-3/5 h-3/5 overflow-auto">
                            <h3 className="text-lg font-bold mb-4">Dream Interpretation</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold">Summary</h4>
                                    <p>{summary}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Psychological Meaning</h4>
                                    <p>{psychologicalMeaning}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Mental Health Status</h4>
                                    <p>{mentalHealth}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Physical Health Insights</h4>
                                    <p>{physicalHealth}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Disease Indications</h4>
                                    <p>{diseaseIndications}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Dream Convey Message</h4>
                                    <p>{dreamConveyMessage}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Sleep Quality Suggestions</h4>
                                    <p>{sleepQuality}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Lucid Dream</h4>
                                    <p>{lucidDream}</p>
                                </div>
                            </div>
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                                onClick={handleCloseModal} 
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                <section className="bg-gray-200 p-4 rounded-lg col-span-1">
                    <h3 className="text-gray-600 font-semibold">Mental Health Tracker</h3>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                    {dreams.length > 0 && (
                            <>
                        <div className="bg-white p-2 rounded-lg flex flex-col items-center">
                            <FontAwesomeIcon icon={faHeart} className="text-gray-600" />
                            <span className="text-gray-600 text-sm">Anxiety Relief</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg flex flex-col items-center">
                            <FontAwesomeIcon icon={faBrain} className="text-gray-600" />
                            <span className="text-gray-600 text-sm">Pain Relief</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg flex flex-col items-center">
                            <FontAwesomeIcon icon={faTint} className="text-gray-600" />
                            <span className="text-gray-600 text-sm">Relaxation</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg flex flex-col items-center">
                            <FontAwesomeIcon icon={faTint} className="text-gray-600" />
                            <span className="text-gray-600 text-sm">Vitamin C</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg flex flex-col items-center">
                            <FontAwesomeIcon icon={faTint} className="text-gray-600" />
                            <span className="text-gray-600 text-sm">Vitamin B</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg flex flex-col items-center">
                            <FontAwesomeIcon icon={faHeart} className="text-gray-600" />
                            <span className="text-gray-600 text-sm">Headache Relief</span>
                        </div>
                        </>
                         )}
                    </div>
                    <h3 className="text-gray-600 font-semibold mt-4">Diagnoses</h3>
                    <div className="bg-white p-2 rounded-lg mt-2 flex justify-between items-center">
                        <span className="flex items-center"><FontAwesomeIcon icon={faLungs} className="text-gray-600 mr-2" /> Pneumonia</span>
                        <span className="text-gray-600">2 weeks ago</span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
                    </div>
                    <div className="bg-white p-2 rounded-lg mt-2 flex justify-between items-center">
                        <span className="flex items-center"><FontAwesomeIcon icon={faAllergies} className="text-gray-600 mr-2" /> Allergy Relief</span>
                        <span className="text-gray-600">3 weeks ago</span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
                    </div>
                    <div className="bg-white p-2 rounded-lg mt-2 flex justify-between items-center">
                        <span className="flex items-center"><FontAwesomeIcon icon={faVirus} className="text-gray-600 mr-2" /> COVID-19</span>
                        <span className="text-gray-600">2 years ago</span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
                    </div>
                    <div className="bg-white p-2 rounded-lg mt-2 flex justify-between items-center">
                        <span className="flex items-center"><FontAwesomeIcon icon={faSyringe} className="text-gray-600 mr-2" /> Flu Season</span>
                        <span className="text-gray-600">3 years ago</span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
                    </div>
                </section>
                <section className="bg-gray-200 p-4 rounded-lg col-span-1">
                    <h3 className="text-gray-600 font-semibold">Alerts</h3>
                    {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                    <div className="bg-white p-2 rounded-lg mt-2 flex justify-between items-center" key={index}>
                        <span className="text-gray-600">{alert}</span>
                        <FontAwesomeIcon icon={faEllipsisV} className="text-gray-600" />
                    </div>
                    ))
                    ) : (
                        <p className="text-gray-600">No alerts at this time.</p>
                    )}
                    <div className="mt-4">
                    <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                    >
                        Logout
                    </button>
                    </div>
            </section>
            </main>
            <footer className="bg-white shadow-md py-4">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600">&copy; 2024 DreamAura. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
