# Personal Portfolio Website

A modern, responsive portfolio website built with React, featuring a dynamic two-panel layout, smooth animations, and a showcase of professional projects and skills.
This product was created by myself, Nicholas Hamilton as a personal project to showcase my skills and experience in web development. I have provided instructions below on how to install and run the project locally, as well as how to deploy the project to GitHub Pages if you would like to host your own version of the site.
Please feel free to reach out to me if you have any questions or feedback about the project. I hope you enjoy exploring the site!

Read more about the project in the [repository documentation](repository-documentation.md).

## 🌟 Features

- **Dynamic Two-Panel Layout**
    - Fixed left panel with navigation and contact info
    - Responsive right panel for content display
    - Smooth transitions between pages

- **Interactive Elements**
    - Rainbow animation effect on name
    - Scroll-based reveal animations
    - Hover effects on project cards
    - Social media integration

- **Responsive Design**
    - Mobile-friendly layout
    - Adaptive navigation system
    - Optimized image loading
    - Flexible grid systems

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-project.git
cd portfolio-project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The site will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- **Development Mode**
  ```bash
  npm start
  ```
  Runs the app in development mode with hot reloading

- **Production Build**
  ```bash
  npm run build
  ```
  Creates an optimized production build in the `build` folder

- **Testing**
  ```bash
  npm test
  ```
  Launches the test runner in interactive watch mode

### Deployment

1. Make the deployment script executable
```bash
chmod +x deploy.sh
```

2. Run the deployment script
```bash
./deploy.sh
```

This will build the project and deploy it to GitHub Pages.

## 📁 Project Structure

```
portfolio-project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main page components
│   ├── images/        # Static images
│   └── styles/        # Global styles
├── public/            # Static files
└── deploy.sh          # Deployment script
```

## 🎨 Key Components

- **Layout.js**: Main layout with fixed left panel and dynamic right panel
- **HomePage.js**: Landing page with introduction and featured projects
- **AboutPage.js**: Detailed background with animated sections
- **ProjectsPage.js**: Project showcase with interactive cards

## 🔧 Customization

1. **Personal Information**
    - Update content in page components
    - Modify profile images in `src/images`
    - Adjust social media links in `Layout.js`

2. **Styling**
    - Global styles in `src/styles`
    - Component-specific styles in `.module.css` files
    - Animation settings in respective style files

3. **Projects**
    - Add new projects in `ProjectsPage.js`
    - Update project images and links
    - Modify card layouts and animations


## 📧 Contact

Nicholas Hamilton - [hamiltonn428@gmail.com](mailto:hamiltonn428@gmail.com)

Project Link: [https://github.com/yourusername/portfolio-project](https://github.com/hamiltonnBC/portfolio-project)