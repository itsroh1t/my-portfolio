'use client';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image/Avatar */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-glow"></div>
              <div className="relative bg-gray-800 rounded-2xl p-8 glow-border">
                <div className="w-full aspect-square bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <div className="text-9xl">👨‍💻</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Full Stack Developer from Jaipur, Rajasthan
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm a passionate Full Stack Developer with 6+ months of professional experience 
              building modern, scalable web applications. Currently working at 
              <span className="text-blue-400 font-semibold"> Phoenix Advanced Software Pvt. Ltd.</span>
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              I specialize in creating clean, pixel-perfect frontends with strong backend logic. 
              My tech stack includes React, Node.js, Next.js, MySQL. I love converting 
              complex problems into simple, elegant solutions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">📧</span>
                  <span className="text-gray-400">Email Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">📍</span>
                  <span className="text-gray-400">Jaipur, Rajasthan</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">🎓</span>
                  <span className="text-gray-400">B.Tech CSE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">💼</span>
                  <span className="text-gray-400">Open to Work</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm">
                AI Enthusiast
              </span>
              <span className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-sm">
                Open Source
              </span>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;