# Stage 1: Build React application
FROM node:latest-alpine 

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . ./

# Build the React app
RUN npm run build

# Stage 2: Serve React application with Nginx
FROM nginx:alpine

# Copy build files from Stage 1
COPY . /app/build /usr/share/nginx/html


# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]