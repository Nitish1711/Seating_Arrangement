# Stage 1: Build React application
FROM node:latest-alpine as build

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
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]