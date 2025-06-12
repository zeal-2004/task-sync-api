# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (optimizes caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Expose API port (must match server.js port)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]