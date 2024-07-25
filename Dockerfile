FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .

EXPOSE 4001

CMD ["nodemon", "app.js"]
