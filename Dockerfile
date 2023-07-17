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
ENV DATABASE_URL=mongodb+srv://hashaam:hk42471072@testcluster.qx7vnml.mongodb.net/TodoAppApi?retryWrites=true&w=majority

# command to run the application
CMD ["npm", "start"]