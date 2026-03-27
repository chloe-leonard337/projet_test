FROM node:20-alpine
RUN apk add --no-cache \
    xvfb \
    xauth \
    ttf-freefont \
    fontconfig \
    nss \
    chromium \
    chromium-chromedriver
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
