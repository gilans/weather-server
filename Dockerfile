FROM node:latest

# set working directory
WORKDIR /app

ADD package*.json /app/
RUN npm install

COPY . /app/
# start app
CMD ["npm", "start"]

