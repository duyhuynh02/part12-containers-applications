FROM node:20 

WORKDIR /usr/src/app

ENV VITE_BACKEND_URL=http://server:8080/api/

COPY . .

RUN npm ci 

RUN npm run build 
