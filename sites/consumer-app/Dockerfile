FROM node:18.19.0-alpine AS builder
ARG IMAGE_TAG_ARG='m-default'
RUN yarn set version 4.1.0


WORKDIR /app/consumer-app


COPY ./packages ./packages
COPY ./.yarn ./.yarn
COPY ./sites/consumer-app ./sites/consumer-app 
COPY ./package.json ./yarn.lock ./tsconfig.base.json ./.yarnrc.yml ./nx.json ./




# # only install dependency in production
RUN yarn workspaces focus --production  @sites/consumer-app 


ENV NODE_ENV=production