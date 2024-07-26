FROM node:18-slim

WORKDIR /express-docker

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
EXPOSE 3000
