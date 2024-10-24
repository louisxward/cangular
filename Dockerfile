# Use a Node.js base image
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install @angular/cli

COPY . .
RUN ng build

# Use the official Nginx image
FROM nginx:alpine

# Copy the build output to the Nginx server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration (this will be mounted as a volume)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80