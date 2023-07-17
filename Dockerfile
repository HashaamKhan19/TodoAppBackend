FROM node:18

# set working directory inside the container
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json

# install dependencies
RUN npm install

# copy all application files to the container's working directory
COPY . .

# Environment variables
ENV MONGO_CONNECTION_STRING

# command to run the application
CMD ["npm", "start"]