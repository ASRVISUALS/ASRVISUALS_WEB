# ASR Visuals - Full Stack Portfolio Platform

A comprehensive full-stack web application for a creative portfolio and services business.

## Project Overview

ASR Visuals is a modern, responsive portfolio platform built with React and Node.js/Express. It features:

- Beautiful portfolio showcase
- Blog management system
- Service listings
- Contact management
- Admin dashboard for content management
- Responsive design
- API-driven architecture

## Project Structure

```
asrvisuals/
├── frontend/          # React.js frontend application
├── backend/           # Node.js/Express backend API
├── database/          # Database migrations and seeds
├── docker/            # Docker configuration files
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Technology Stack

### Frontend
- React 18
- React Router 6
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File uploads)

### DevOps
- Docker
- Docker Compose

## Getting Started

### Prerequisites
- Node.js 14+
- MongoDB
- Docker (optional)

### Installation

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`.

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`.

### Running with Docker

```bash
cd docker
docker-compose up
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:5000`
- MongoDB on `localhost:27017`

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/asrvisuals
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Documentation

Detailed API documentation is available in `backend/README.md`.

### Main Endpoints
- `/api/auth` - Authentication
- `/api/portfolio` - Portfolio management
- `/api/blog` - Blog management
- `/api/contact` - Contact submissions
- `/api/youtube/work` - Cached YouTube playlists and categorized portfolio videos

## Automatic YouTube Work Categories

The Services page loads `/services#our-work` from the backend YouTube proxy. Configure
the server values in `backend/.env` (see `backend/.env.example`). The root
`.env.local.example` is also provided for teams migrating this feature to Next.js:

- `YOUTUBE_API_KEY` is a YouTube Data API v3 key and must stay server-side.
- `YOUTUBE_CHANNEL_ID` identifies the ASR Visuals channel.
- `YOUTUBE_PLAYLIST_<CATEGORY>` optionally pins a playlist to a website category.

Playlist titles are discovered automatically when an explicit playlist ID is not
configured. A video in a mapped playlist uses that playlist category. Videos found
only in channel uploads are classified from title keywords such as `wedding`,
`commercial`, `music video`, `corporate`, and `reels`; everything else is placed in
`Other`. API responses are cached for one hour, so new uploads appear on the next
cache refresh without editing the frontend.

To add a category, add a `CATEGORY: process.env.YOUTUBE_PLAYLIST_CATEGORY || ''`
entry to `backend/src/config/youtubeCategories.js`, then add that playlist ID to
`.env.local`. Create or update the matching playlist in YouTube and put each video
in the playlist. The next refresh will include it automatically.
- `/api/users` - User management

## Features

### Frontend
- Home page with hero section
- Portfolio gallery with filtering
- Services showcase
- Blog section
- Contact form
- Admin dashboard
- Responsive design
- Theme support

### Backend
- User authentication with JWT
- CRUD operations for all resources
- File upload capability
- Input validation
- Error handling
- RESTful API design

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a Pull Request

## License

## 🚀 Deployment to Production

### Vercel Deployment

ASR Visuals is optimized for Vercel deployment with full support for:
- Monorepo architecture (frontend + backend)
- Serverless functions
- Edge network
- Auto-scaling
- SSL/HTTPS
- Performance monitoring

**Complete deployment guides available:**
1. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Comprehensive production deployment instructions including:
	- Frontend build optimization
	- Backend configuration
	- Google Search Console integration
	- Performance monitoring setup
	- Core Web Vitals guidance
	- Google Analytics configuration

2. **[VERCEL_DEPLOYMENT_CHECKLIST.md](./VERCEL_DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist covering:
	- Pre-deployment optimization
	- Vercel project setup
	- Domain and DNS configuration
	- First deployment verification
	- Google Search Console setup
	- SEO validation
	- Performance monitoring
	- Troubleshooting guide

### Quick Start

```bash
# 1. Build frontend
cd frontend && npm run build

# 2. Push to GitHub
git add . && git commit -m "Ready for deployment" && git push

# 3. Deploy on Vercel
# - Visit https://vercel.com
# - Import your GitHub repository
# - Set environment variables
# - Deploy!

# 4. Connect domain
# Add asrvisuals.live in Vercel Settings → Domains
```

**Current Build Status:** ✅ 124.44 KB (gzipped) - Production Ready

This project is licensed under the ISC License.

## Support

For support, email support@asrvisuals.com or create an issue in the repository.
