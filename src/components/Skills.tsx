'use client';

import { useEffect, useState } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('skills');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML/CSS', level: 95, color: 'bg-orange-500' },
        { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
        { name: 'React', level: 88, color: 'bg-blue-500' },
        { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
        { name: 'Bootstrap', level: 88, color: 'bg-purple-500' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85, color: 'bg-green-500' },
        { name: 'Python', level: 82, color: 'bg-blue-600' },
        { name: 'Automation Scripting', level: 87, color: 'bg-cyan-700' }
      ]
    },
    {
      category: 'Database',
      skills: [
        { name: 'MySQL', level: 80, color: 'bg-green-600' }
      ]
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git / GitHub', level: 90, color: 'bg-gray-600' },
        { name: 'VS Code', level: 95, color: 'bg-blue-400' },
        { name: 'Figma', level: 80, color: 'bg-pink-500' }
      ]
    }
  ];


  const technologies = [
    '🌐 HTML',
    '🎨 CSS',
    '⚡ JavaScript',
    '⚛️ React',
    '🎯 Tailwind CSS',
    '🐍 Python',
    '🗄️ MySQL',
    '🔧 Git & GitHub',
    '🤖 Selenium',
    '🧠 Botasaurus',
    '🔗 REST APIs',
    '📱 Responsive Design'
  ];


  return (
    <section id="skills" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Progress Bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 glow-border">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="gradient-text">{category.category}</span>
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-blue-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Tags Cloud */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 glow-border">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <span className="gradient-text">Tech Stack</span>
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg text-gray-300 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {[
            { icon: '🌐', title: 'Open Source', desc: 'Contributing to community' },
            { icon: '✍️', title: 'Tech Blogging', desc: 'Sharing knowledge' },
            { icon: '🎮', title: 'Gaming', desc: 'Coding challenges' },
            { icon: '✈️', title: 'Travelling', desc: 'Exploring new places' }
          ].map((interest, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center glow-border card-hover"
            >
              <div className="text-4xl mb-3">{interest.icon}</div>
              <h4 className="text-white font-semibold mb-2">{interest.title}</h4>
              <p className="text-gray-400 text-sm">{interest.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;