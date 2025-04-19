# The base image we will use
FROM node:23-alpine3.20

# Define our ABSOLUTE workdir
WORKDIR /age-calculator

# First we copy the json files, then we install all packages, and then copy the rest of files
COPY package*.json ./
RUN npm install
COPY . .

# Run the command to start vite
CMD ["npm", "run", "dev"]
