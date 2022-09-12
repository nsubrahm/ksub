FROM node:16.17.0 as build

COPY /app .

RUN npm install

CMD ["node", "index.js"]
