'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-13 rounded-lg overflow-hidden">
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-xl">Rohit Sharma</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full Stack Developer passionate about creating modern, scalable web applications with clean UI/UX and performance optimization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>📧</span>
                <span>rohitsharma59196@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>📍</span>
                <span>Jaipur, Rajasthan</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>💼</span>
                <span>Open to opportunities</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { name: 'GitHub', icon: '🐙', link: 'https://github.com/itsroh1t' },
            { name: 'LinkedIn', icon: '🌐', link: 'https://linkedin.com/in/itsroh1t' },
            { name: 'Instagram', icon: '📱', link: 'https://www.instagram.com/rohiit_sharma_27' }
          ].map((social) => (
            <a
              key={social.name}
              href={social.link}
              className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Rohit Sharma. Built with ❤️ using Next.js & Tailwind CSS
          </p>
          <p className="text-gray-300 text-xs mt-2">
            Designed & Developed by Rohit Sharma
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;