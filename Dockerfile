# frontend/Dockerfile
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
# Needed rn but surely another way
RUN npm install -g @angular/cli
COPY . .
RUN ng build --configuration=production