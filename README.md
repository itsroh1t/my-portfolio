# 🚀 Rohit Sharma - Portfolio Website

Modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Modern Design** - Clean, gradient-based UI with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 15
- 🎭 **Smooth Animations** - Engaging user experience with CSS animations
- 🌙 **Dark Theme** - Eye-friendly dark color scheme
- 📊 **Interactive Skills** - Animated progress bars
- 💼 **Project Showcase** - Beautiful project cards with details
- 📬 **Contact Form** - Easy way to get in touch
- 🔍 **SEO Optimized** - Better search engine visibility

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Inter & Poppins (Google Fonts)
- **Icons:** Emoji & SVG

## 📁 Project Structure

```
rohit-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main homepage
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── Navbar.tsx        # Navigation bar
│       ├── Hero.tsx          # Hero section
│       ├── About.tsx         # About section
│       ├── Experience.tsx    # Work experience
│       ├── Projects.tsx      # Projects showcase
│       ├── Skills.tsx        # Skills & technologies
│       ├── Contact.tsx       # Contact form
│       └── Footer.tsx        # Footer
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project directory:**
   ```bash
   cd rohit-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Customization Guide

### 1. Personal Information

Edit `src/components/Hero.tsx`:
```typescript
const roles = ['Full Stack Developer', 'Your Role', 'Another Role'];
```

Edit `src/components/About.tsx`:
```typescript
// Update company name, location, etc.
```

### 2. Projects

Edit `src/components/Projects.tsx`:
```typescript
const projects = [
  {
    title: 'Your Project',
    category: 'Category',
    description: 'Description',
    tech: ['Tech1', 'Tech2'],
    // ... more fields
  }
];
```

### 3. Skills

Edit `src/components/Skills.tsx`:
```typescript
const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'Skill Name', level: 90, color: 'bg-blue-500' }
    ]
  }
];
```

### 4. Contact Information

Edit `src/components/Contact.tsx`:
```typescript
const contactInfo = [
  {
    icon: '📧',
    title: 'Email',
    value: 'your.email@example.com',
    link: 'mailto:your.email@example.com'
  }
];
```

### 5. Colors & Theme

Edit `src/app/globals.css` for custom colors:
```css
.gradient-text {
  @apply bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500;
}
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder

### Manual Deployment

```bash
npm run build
npm start
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "^16.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.5",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "eslint": "^9.18.0",
    "eslint-config-next": "^16.1.6",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.3"
  }
}
```

## 🎯 Features to Add (Future)

- [ ] Blog section
- [ ] Dark/Light mode toggle
- [ ] Project filtering
- [ ] Animation library (Framer Motion)
- [ ] Backend for contact form
- [ ] Analytics integration
- [ ] Newsletter subscription
- [ ] Testimonials section

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Rohit Sharma**
- Location: Rajasthan, India
- Role: Full Stack Developer
- Education: B.Tech CSE - Arya College

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

## 📞 Contact

Feel free to reach out for collaborations or questions!

---

**Built with ❤️ using Next.js & Tailwind CSS**