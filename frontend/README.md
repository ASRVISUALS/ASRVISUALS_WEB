# ASR Visuals - Frontend

React-based frontend for the ASR Visuals portfolio and services platform.

## Project Structure

- `public/` - Static assets and HTML template
- `src/` - React application source code
  - `components/` - Reusable React components
  - `pages/` - Page components
  - `layouts/` - Layout components
  - `hooks/` - Custom React hooks
  - `context/` - React context providers
  - `utils/` - Utility functions and API client
  - `styles/` - Global and component styles

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

The application will run on `http://localhost:3000`.

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```dotenv
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)
