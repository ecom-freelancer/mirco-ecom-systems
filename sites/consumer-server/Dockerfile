
FROM node:18.19.0-alpine AS builder
ARG IMAGE_TAG_ARG='m-default'

RUN yarn set version 4.1.0

WORKDIR /app/consumer-server


COPY ./packages ./packages
COPY ./.yarn ./.yarn
COPY ./sites/consumer-server ./sites/consumer-server 
COPY ./package.json ./yarn.lock ./tsconfig.base.json ./.yarnrc.yml ./nx.json ./




# # only install dependency in production
RUN yarn workspaces focus --production  @sites/consumer-server 


ENV NODE_ENV=production


