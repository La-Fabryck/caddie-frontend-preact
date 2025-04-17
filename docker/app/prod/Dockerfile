# Stage 1: Build the app
FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json /app/
COPY vite.config.ts /app/

RUN npm ci

COPY . /app

ENV NODE_ENV=production
RUN npm run build  # Outputs to /app/dist

# Add gzip compression for static files
RUN find /app/dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -exec gzip -k9 {} \;

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./docker/app/prod/nginx.conf /etc/nginx/conf.d/default.conf

# Enable pre-compressed files
RUN echo "gzip_static on;" >> /etc/nginx/conf.d/gzip.conf

EXPOSE 80