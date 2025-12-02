# BuildAU App

A minimal web application built with Vite + React + TypeScript + Tailwind CSS.

## Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Modern React with hooks
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📁 **Clean folder structure** - Organized project layout

## Project Structure

```
src/
├── components/     # Reusable React components
├── assets/         # Static assets (images, fonts, etc.)
├── styles/         # Additional CSS files (if needed)
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── index.css       # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd buildau
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development

### Adding Components

Create new components in the `src/components/` directory:

```tsx
// src/components/Example.tsx
import React from 'react'

interface ExampleProps {
  title: string
}

export const Example: React.FC<ExampleProps> = ({ title }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}
```

### Using Tailwind CSS

Tailwind CSS is fully configured and ready to use. You can apply utility classes directly to your JSX elements:

```tsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-gray-800">Hello World!</h1>
  </div>
</div>
```

## Deployment

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check for issues
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE). 