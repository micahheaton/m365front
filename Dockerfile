# Use an official Node.js runtime as the base image
FROM node:17-alpine

# Create and set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .

# Build the app for production
RUN npm run build

# Expose the app's port
EXPOSE 5000

# Start the app
CMD ["npm", "run", "preview"]