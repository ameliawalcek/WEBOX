FROM node:12.18.3-alpine3.9

WORKDIR '/node-app'

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# EXPOSE 3001

CMD [ "npm", "run", "start" ]
