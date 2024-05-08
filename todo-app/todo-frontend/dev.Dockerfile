FROM node:20 

WORKDIR /user/src/app

COPY . . 

RUN npm install 

CMD ["npm", "run", "dev", "--", "--host"]

