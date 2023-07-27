FROM node:18

# Allow gulp to called globally.
# @see https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#global-npm-dependencies
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g gulp

# Set for generic current folder access.
WORKDIR /app/frontend-source
