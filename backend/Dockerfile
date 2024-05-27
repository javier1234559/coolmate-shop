# Use an official Node.js runtime as a parent image
FROM node:21

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Set environment variables

# Copy the rest of the application code
COPY . .

# Expose port 8080 (or the port your backend runs on)
EXPOSE 8080

# Command to run the backend
CMD ["npm", "start"]
