FROM node:16.14.2-alpine3.15 AS base
WORKDIR /usr/src/app
RUN npm install --global npm@8.7.0


FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk add openjdk11

RUN npm install --global rimraf firebase-tools

RUN firebase emulators:exec "node --version" --only firestore

EXPOSE 3000

CMD ["npm", "install"]


FROM base AS build

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build --if-present

FROM base as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
COPY firebase*.json ./
COPY firestore* ./

RUN npm install --only=production

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]