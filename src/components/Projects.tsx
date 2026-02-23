'use client';

const Projects = () => {
  const projects = [
    {
      title: 'Task Management System',
      category: 'Full Stack Web Application',
      description: 'A comprehensive task management platform built with React and JavaScript for organizing, tracking, and managing tasks efficiently with an intuitive user interface.',
      tech: ['React', 'JavaScript', 'Tailwind CSS'],
      features: [
        'Task creation and organization',
        'Real-time task tracking',
        'Responsive design',
        'User-friendly interface'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Browser Automation Framework',
      category: 'Automation & Testing',
      description: 'Robust browser automation framework using Python with Selenium and Botasaurus for automated testing, web scraping, and repetitive task automation.',
      tech: ['Python', 'Selenium', 'Botasaurus'],
      features: [
        'Automated browser testing',
        'Web scraping capabilities',
        'Task automation',
        'Error handling & logging'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Business Websites',
      category: 'Web Development',
      description: 'Professional business websites including ads-circle.com, adotizing.com, and articlegrip.com with modern design and responsive layouts.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      features: [
        'Responsive design',
        'Modern UI/UX',
        'SEO optimized',
        'Fast loading performance'
      ],
      link: 'https://www.articlegrip.com',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'Frontend Games',
      category: 'Interactive Gaming',
      description: 'Collection of interactive browser-based games including Tic Tac Toe and Stone Paper Scissors built with vanilla JavaScript, HTML, and CSS.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      features: [
        'Interactive gameplay',
        'Clean game logic',
        'Responsive controls',
        'Score tracking'
      ],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects showcasing full stack development, automation, and modern web solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden glow-border card-hover"
            >
              {/* Project Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
              
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <span className="text-blue-400 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Optional Live Link - Only for projects with links */}
                {project.link && (
                  <div className="mt-6">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors group/link"
                    >
                      <span>View Live Project</span>
                      <svg 
                        className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Interested in collaborating on a project? Let's connect!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;