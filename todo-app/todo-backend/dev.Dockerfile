FROM node:20 

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install

COPY . . 

# ENV 
# PORT=3000

# Port to listener
EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
