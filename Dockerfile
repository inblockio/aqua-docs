# Use Node.js LTS version as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install Mintlify CLI globally
RUN npm install -g mintlify@latest

# Copy the documentation files
COPY . .

# Expose the default Mintlify dev server port
EXPOSE 3050

# Run mint dev with host 0.0.0.0 to allow external connections
CMD ["mintlify", "dev", "--host", "0.0.0.0", "--port", "3050"]
