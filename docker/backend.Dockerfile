FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY backend/ .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start command
CMD ["node", "dist/app.js"]