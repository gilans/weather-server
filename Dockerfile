FROM node:latest

# set working directory
RUN mkdir /app
WORKDIR /app

ADD package*.json /app/
RUN npm install

COPY . /app/
# start app
CMD ["npm", "start"]

