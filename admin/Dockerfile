FROM node:14-slim

RUN npm install 

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]