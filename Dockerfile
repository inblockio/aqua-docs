# Use Node.js LTS version as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the Next.js dev server port
EXPOSE 3000

# Run Next.js dev server
CMD ["npm", "run", "dev"]
