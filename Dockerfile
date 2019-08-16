# Use an official latest Node runtime as a parent image from Docker Hub
FROM node:10

# Set the working directory to /app
WORKDIR /NodeJsExpress

# Install app dependencies. A wildcard is used to ensure both package.json And package-lock.json are copied
COPY package*.json ./

#Bundle app source
#COPY ./app .
COPY . /NodeJsExpress

RUN npm install -g nodemon
RUN npm install

# If you are building your code for production, run npm ci –only=production

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.js when the container launches
CMD ["node", "app/app.js"]
