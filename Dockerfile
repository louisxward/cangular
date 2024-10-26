FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @angular/cli --location=global
COPY . .
RUN ng build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80