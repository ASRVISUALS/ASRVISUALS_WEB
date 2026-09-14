# ASR Visuals - Backend API

Express.js-based backend API for the ASR Visuals portfolio and services platform.

## Project Structure

- `src/`
  - `controllers/` - Request handlers
  - `models/` - MongoDB schemas
  - `routes/` - API route definitions
  - `middleware/` - Custom middleware
  - `config/` - Configuration files
  - `utils/` - Utility functions
  - `server.js` - Main server file
- `uploads/` - Uploaded files directory
- `tests/` - Test files

## Getting Started

### Prerequisites
- Node.js 14+ and npm
- MongoDB local or remote instance

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

### Production

```bash
npm start
```

### Testing

```bash
npm test
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/asrvisuals
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
OWNER_SETUP_KEY=one_time_secure_key_for_owner_creation
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user (returns JWT)
- `POST /api/auth/login` - Login user (returns JWT)
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/bootstrap-owner` - One-time owner account creation using `OWNER_SETUP_KEY`
- `GET /api/auth/me` - Get current authenticated user

### Portfolio
- `GET /api/portfolio` - Get all portfolios
- `GET /api/portfolio/:id` - Get portfolio by ID
- `POST /api/portfolio` - Create portfolio
- `PATCH /api/portfolio/:id` - Update portfolio
- `DELETE /api/portfolio/:id` - Delete portfolio

### Blog
- `GET /api/blog` and `GET /api/blogs` - Get all blogs
- `GET /api/blog/:id` and `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blog` - Create blog (owner/admin only)
- `PATCH /api/blog/:id` - Update blog (owner/admin only)
- `DELETE /api/blog/:id` - Delete blog (owner/admin only)

### Contact
- `POST /api/contact` - Create contact message (public)
- `GET /api/contact` - Get all contacts (owner/admin only)
- `GET /api/contact/:id` - Get contact by ID (owner/admin only)
- `DELETE /api/contact/:id` - Delete contact (owner/admin only)

### Users
- `GET /api/users` - Get all users (owner only)
- `GET /api/users/:id` - Get user by ID (owner only)
- `PATCH /api/users/:id` - Update user (owner only)
- `DELETE /api/users/:id` - Delete user (owner only)

### Admin CMS (Owner Panel)
- `GET /api/admin/dashboard` - Dashboard stats for owner panel
- `GET /api/admin/settings` - Read global site settings
- `PUT /api/admin/settings/:key` - Update one global setting
- `GET /api/admin/pages` - List editable pages
- `GET /api/admin/pages/:slug` - Get one page schema/content
- `PUT /api/admin/pages/:slug` - Create/update page content
- `PATCH /api/admin/pages/:slug/sections/:sectionKey` - Update a specific section
- `GET /api/admin/snapshot` - Full editable website data snapshot
