'use client';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Developer',
      company: 'Phoenix Advanced Software Pvt. Ltd.',
      period: 'Oct 2025 – Present',
      location: 'Jaipur, Rajasthan',
      description: 'Developed web features, implemented CRUD and APIs, improved UI and fixed bugs, and built Python automation using Selenium and Botasaurus.',
      responsibilities: [
        'Developed and tested web app features with team support',
        'Implemented CRUD, APIs & database operations',
        'Fixed bugs and enhanced UI',
        'Built Python automation using Selenium & Botasaurus'
      ],
      tech: ['React', 'Node.js', 'Next.js', 'MySQL', 'Python'],
      current: true
    },
    {
      title: 'Full Stack Developer intern',
      company: 'Digital Whopper Pvt. Ltd.',
      period: 'July 2025 – Sept 2025',
      location: 'Jaipur, Rajasthan',
      description: 'Handled basic front-end tasks, built responsive UI, learned RESTful APIs, and supported testing with minor bug fixes.',
      responsibilities: [
        'Worked on basic front-end development tasks',
        'Assisted team in creating simple responsive UI components',
        'Learned how RESTful APIs are used in real projects',
        'Supported in testing and minor bug fixing'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      current: false
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2024 – Present',
      location: 'Remote',
      description: 'Creating custom business websites with modern UI/UX and responsive layouts.',
      responsibilities: [
        'Built custom business websites',
        'Designed modern UI/UX interfaces',
        'Delivered responsive layouts',
        'Managed client relationships'
      ],
      tech: ['React', 'Tailwind', 'Figma', 'Next.js'],
      current: true
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full z-10 animate-glow"></div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 glow-border card-hover">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      {exp.current && (
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-blue-400 font-semibold mb-2">{exp.company}</div>
                    <div className="text-gray-400 text-sm mb-4">
                      {exp.period} • {exp.location}
                    </div>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start">
                          <span className="text-blue-400 mr-2">▹</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;