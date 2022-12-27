FROM node:16.17-alpine

WORKDIR /usr
COPY package.json ./
#COPY .env ./
COPY tsconfig.json ./
COPY src ./src
COPY docker_env.env ./.env
RUN npm install
# RUN npm start

# EXPOSE 8080

CMD [ "npm", "run", "start" ]