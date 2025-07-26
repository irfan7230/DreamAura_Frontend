import React from 'react';
import dreamimg from './img/dream.jpg';
import interpret from './img/angel.jpg';
import Customizable from './img/userspec.png';
import illution from './img/illusion.jpg';
import Dement from './img/Dement.jpg';
import Nathaniel from './img/Nathenial.jpg';
import Freud from './img/Freud.jpg';

const Features = () => {
  return (
    <div className="w-screen h-screen bg-white flex flex-col">

      <main className="flex-grow p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">AI Dream Visualization</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-1/2">
              <p className="mb-2">
                Our AI dream visualization feature utilizes advanced algorithms to transform your dream descriptions into vivid, lifelike images.
              </p>
              <ul className="list-disc list-inside">
                <li>Easy to use interface</li>
                <li>High-quality visualizations</li>
                <li>Real-time rendering</li>
                <li>Customizable settings for personalized dream interpretations</li>
                <li>Seamless integration with mental health tracking and analysis features</li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
              <img src={dreamimg} alt="Colorful dream visualization illustration" style={{ width: '250px', height: '250px' }} className="rounded-lg shadow-md"/>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mental Health Insights</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
              <img src={illution} alt="Person meditating with mental health insights illustration" style={{ width: '250px', height: '250px' }} className="rounded-lg shadow-md"/>
            </div>
            <div className="md:w-1/2">
              <p className="mb-2">
                Understanding your dreams can offer profound insights into your mental health, revealing hidden emotions, identifying stressors, improving emotional well-being, and enhancing self-awareness through subconscious exploration.
              </p>
              <ul className="list-disc list-inside">
                <li>Identify stressors and anxieties</li>
                <li>Improve sleep quality</li>
                <li>Gain insights into your emotional state</li>
                <li>Dream Mood Analysis</li>
                <li>Lucid Dreaming Insights</li>
              </ul>
            </div>
          </div>
        </section>

        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Dream Interpretation</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-1/2">
              <p className="mb-2">
                Our advanced dream interpretation tool analyzes your dream content and provides insights into its possible meanings, helping you uncover your subconscious thoughts and feelings.
              </p>
              <ul className="list-disc list-inside">
                <li>Comprehensive analysis of dream symbols</li>
                <li>Contextual interpretation based on personal experiences</li>
                <li>Guidance on how to apply insights in daily life</li>
                <li>Support for exploring recurring dreams</li>
                <li>Integration with mental health resources for further assistance</li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
              <img src={interpret} alt="Dream interpretation illustration" style={{ width: '250px', height: '250px' }} className="rounded-lg shadow-md"/>
            </div>
          </div>
        </section>

      
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Personalization</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
              <img src={Customizable} alt="User personalization illustration" style={{ width: '250px', height: '250px' }} className="rounded-lg shadow-md"/>
            </div>
            <div className="md:w-1/2">
              <p className="mb-2">
                Customize your dream analysis experience by setting preferences that cater to your specific needs. Tailor insights and visualizations to align with your emotional and mental health goals.
              </p>
              <ul className="list-disc list-inside">
                <li>Personalized dream tracking</li>
                <li>Custom visualization themes</li>
                <li>Settings for notifications and reminders</li>
                <li>Integration with your health and wellness apps</li>
                <li>Ability to share insights with therapists or coaches</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Scientists about dream</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="mb-2">"Freud believed dreams are a window into the unconscious, revealing hidden truths, repressed desires, and unresolved conflicts, offering insights into our innermost thoughts and emotions."</p>
              <div className="flex items-center">
                <img src={Freud} alt="Sigmund Freud" style={{ width: '50px', height: '50px' }} className="rounded-full mr-2"/>
                <div>
                  <p className="font-bold">Sigmund Freud</p>
                  <p className="text-sm text-gray-600">Austrian neurologist</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="mb-2">"Dreaming permits each and every one of us to experience the depths of our imagination, exploring bizarre scenarios and emotions, allowing our minds to roam freely every night."</p>
              <div className="flex items-center">
                <img src={Nathaniel} alt="Nathaniel Kleitman" style={{ width: '50px', height: '50px' }} className="rounded-full mr-2"/>
                <div>
                  <p className="font-bold">Nathaniel Kleitman</p>
                  <p className="text-sm text-gray-600">Sleep Researcher</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="mb-2">"Dreams are a vibrant mental kaleidoscope, blending fragments of memory, flights of fantasy, deep-seated wishes, and raw emotions, all intricately stirred by the brain's activity during restful sleep."</p>
              <div className="flex items-center">
                <img src={Dement} alt="William Dement" style={{ width: '50px', height: '50px' }} className="rounded-full mr-2"/>
                <div>
                  <p className="font-bold">William Dement</p>
                  <p className="text-sm text-gray-600">Founder of sleep medicine</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-4 border-t text-center text-gray-600 text-sm">
        <p>&copy; 2024 DreamAura</p>
        <nav className="space-x-4">
          <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
          <a href="/contact" className="hover:text-gray-900">Contact</a>
        </nav>
      </footer>
    </div>
  );
};

export default Features;
