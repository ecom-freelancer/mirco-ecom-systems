FROM nginx:1.13.9-alpine
ARG IMAGE_TAG_ARG='m-default'

WORKDIR /app

COPY ./sites/admin-site/dist ./www
COPY ./sites/admin-site/etc/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000
ENV NODE_ENV=production

CMD ["nginx","-g","daemon off;"]