# frontend/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
#Hmm
RUN npm install -g @angular/cli

COPY . .
RUN ng build --configuration=production

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4200
EXPOSE 4200

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]