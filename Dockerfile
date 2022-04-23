FROM node:16.14.2

WORKDIR /usr/src/app

RUN npm install --global npm@8.7.0 rimraf firebase-tools
