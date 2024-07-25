dockerfile for front end
# Use the official Nginx image
FROM nginx:alpine

# Copy build files to Nginx public directory
COPY build/ /usr/share/nginx/html

# Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]