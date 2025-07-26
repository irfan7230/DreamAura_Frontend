import React from 'react';
import { useNavigate } from 'react-router-dom';

const DreamScape = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleExploreClick = (e) => {
    if (!isLoggedIn) {
        alert('Please sign in to explore your dreams.');
      } else {
        navigate('/dreamprompt');
      }
  };

  return (
        <div>
            <main>
                <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('https://storage.googleapis.com/a1aa/image/U7cAj4pqzgreZCU8SpE59jN27qCcdlXt3PexgmSeLj5m1PFnA.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white relative z-10">
                        <h1 className="text-4xl font-bold">Explore Your Dreams</h1>
                        <p className="mt-4 text-lg">Unlock the secrets of your subconscious</p>
                        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600" onClick={handleExploreClick}>Explore Now</button>
                    </div>
                </section>
                <section className="bg-blue-50 py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold">Our Services</h2>
                        <p className="mt-4 text-gray-600">We offer a range of services to help you understand and enhance your dreams.</p>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold">Dream Interpretation</h3>
                                <p className="mt-4 text-gray-600">Gain insights into the meanings behind your dreams with our expert interpretations.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold">Lucid Dreaming Techniques</h3>
                                <p className="mt-4 text-gray-600">Learn how to control your dreams and experience them vividly.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold">Dream Journaling</h3>
                                <p className="mt-4 text-gray-600">Discover the benefits of keeping a dream journal and how it can enhance your dream recall.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-white py-8">
                <div className="container mx-auto text-center">
                    <div className="mb-4">
                        <p>Contact Us</p>
                        <p>Email: <a href="mailto:contact@dreamaura.com" className="text-blue-500">contact@dreamaura.com</a></p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                    
                    <p className="text-gray-600">&copy; 2024 DreamAura. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default DreamScape;
