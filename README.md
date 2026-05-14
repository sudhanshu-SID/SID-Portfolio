# 🚀 Elite Developer Portfolio

A highly interactive, premium, dark-themed personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion. This project emphasizes smooth physics, micro-interactions, and a sleek, modern "glassmorphism" aesthetic to create a memorable first impression.

## ✨ Key Features

- **Interactive 3D Animations:** Advanced use of Framer Motion for scroll-driven animations, parallax effects, and staggered reveals.
- **Physics-Based Tech Stack:** A mesmerizing, custom 2D bouncing screensaver effect simulating floating tech cards inside a stylized macOS glass terminal.
- **Dynamic Hanging Badge:** An interactive 3D hanging name badge component with realistic physics and hover effects.
- **Glassmorphism & Lighting:** Ambient glow effects that track mouse movement, premium gradients, and blurred translucent containers.
- **Responsive & Performant:** Fully responsive across mobile, tablet, and desktop devices without sacrificing animation performance (utilizing 60fps `requestAnimationFrame` loops for custom physics).

## 🛠️ Built With

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Physics:** [Framer Motion](https://www.framer.com/motion/) + Custom lightweight React Physics
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to get the portfolio up and running on your local machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173` (or the port Vite provides).

## 📁 Project Structure Highlights

- `src/components/TechStack.jsx`: Houses the floating macOS terminal and the custom 2D physics engine for bouncing tech cards.
- `src/components/NameBadge.jsx`: The interactive hanging 3D badge element.
- `src/index.css`: Global styles, design tokens, and customized Tailwind configurations.
- `src/App.jsx`: The main application entry point orchestrating the page sections.

## 🎨 Design Philosophy

This portfolio was designed to feel like a premium, "elite-class" digital experience. By deliberately avoiding basic static layouts in favor of free-floating elements, physics simulations, and mouse-tracked ambient lighting, the site serves not just as a resume, but as a live demonstration of advanced frontend engineering and design sensitivity.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
