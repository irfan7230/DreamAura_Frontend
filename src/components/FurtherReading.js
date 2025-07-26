import { useState } from 'react';

const FurtherReading = () => {
  const techniques = [
    {
      title: 'Reality Checks',
      description: 'Frequently ask yourself if you’re dreaming. This can be done by checking physical aspects like pushing your finger through your palm or trying to read text. Such techniques build dream awareness.',
    },
    {
      title: 'Wake-Back-to-Bed (WBTB)',
      description: 'Wake up after 5-6 hours of sleep, stay awake for 20-30 minutes, then go back to sleep. This timing improves your chances of re-entering REM sleep where dreams are more vivid and lucid.',
    },
    {
      title: 'Mnemonic Induction of Lucid Dreams (MILD)',
      description: 'Before sleeping, repeat a phrase like "I will realize I am dreaming" to program your mind. This technique strengthens your ability to recognize dream states by reinforcing intention during sleep.',
    },
    {
      title: 'Keeping a Dream Journal',
      description: 'Write down your dreams each morning. Keeping track of dream patterns helps improve recall and identify recurring symbols. Over time, you may spot patterns that make you more aware in your dreams.',
    },
    {
      title: 'Meditation and Mindfulness',
      description: 'Daily mindfulness and meditation practice enhances self-awareness, which transfers to dreams. By calming the mind and focusing on the present, you increase the likelihood of gaining lucidity in dreams.',
    },
    {
      title: 'Visualization',
      description: 'As you drift off to sleep, imagine yourself in a lucid dream. Visualize gaining control of your dream environment. This priming of the subconscious mind enhances your ability to achieve lucidity during sleep.',
    },
  ];

  const topics = [
    {
      title: 'Understanding Sleep Cycles',
      description: 'Your sleep is divided into stages, including light sleep, deep sleep, and REM. Dreaming primarily occurs during REM sleep. Learning to recognize these stages can help improve your chances of lucid dreaming.',
    },
    {
      title: 'Improving Dream Recall',
      description: 'Dream recall is key to becoming a lucid dreamer. Record your dreams in a journal immediately after waking up to improve memory. Reflecting on dream patterns builds your awareness of the dream world.',
    },
    {
      title: 'The Connection Between Dreams and Mental Health',
      description: 'Dreams are often influenced by your mental state. Stress or anxiety may result in unsettling dreams. Lucid dreaming can be a tool to address unresolved emotions and confront anxieties within the dream state.',
    },
    {
      title: 'Sleep Hygiene for Better Dreaming',
      description: 'Good sleep hygiene practices like a regular sleep schedule and reducing screen time before bed improve your sleep quality. Better sleep leads to more vivid and memorable dreams, which increases lucid dreaming chances.',
    },
    {
      title: 'Exploring Dream Symbolism',
      description: 'Dreams often contain symbols that reflect your subconscious. Understanding common dream symbols can reveal personal insights. Interpreting these symbols can guide you toward deeper self-awareness through dream work.',
    },
    {
      title: 'Using Technology for Dream Enhancement',
      description: 'Technology like lucid dreaming apps and sleep trackers can help monitor your sleep patterns and induce lucidity. These tools assist with recognizing REM stages and waking you during optimal times for lucidity.',
    },
  ];

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const maxDescriptionLength = 200; 

  return (
    <div className="mt-6 flex flex-col lg:flex-row gap-12">
      <div className="lg:w-1/2">
        <h3 className="text-xl font-semibold text-white">Techniques for Lucid Dreaming</h3>
        <ul className="mt-4 space-y-4">
          {techniques.map((technique, index) => (
            <li
              key={index}
              className="relative group cursor-pointer bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              <span className="text-lg font-bold text-white">
                {technique.title}
              </span>
              <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 ease-in-out">
                {truncateText(technique.description, maxDescriptionLength)}
              </p>
            </li>
          ))}
        </ul>
      </div>

    
      <div className="lg:w-1/2">
        <h3 className="text-xl font-semibold text-white">Additional Topics to Explore</h3>
        <ul className="mt-4 space-y-4">
          {topics.map((topic, index) => (
            <li
              key={index}
              className="relative group cursor-pointer bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              <span className="text-lg font-bold text-white">
                {topic.title}
              </span>
              <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 ease-in-out">
                {truncateText(topic.description, maxDescriptionLength)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FurtherReading;
