# micro-ecom-systems
### About
This is a boilerblate to develop a ecom-system contain of management sites, consumer site and other service.

### Techinical
- NestJS
- NextJS v14. AppRouter
- React 18
- Ant Design 5
- Mysql, Redis
- Docker, Nginx

### Repository Structure 

This repository is mono-repo based on yarn workspace v4. The structure include of sites, packages and services.

```
|--packages
|-------ds-core
|-------nest-helper
|-------nest-mysql
|-------nest-redis
|-------nest-file
|-------nest-email
|-------react-user
|-------react-form-builder
|--sites
|-------admin-site
|-------admin-server
|-------consumer-site
|-------consumer-server
|-------storybook

|---package.json
|---yarnrc.yaml

```



### Run project

1. Install dependencies

```bash
 yarn install
```
2. Build packages
```
yarn build:packages
```

3. Migration database

```
yarn migration
```
4. Run app
```
yarn workspace @sites/<app> dev
```


### Deployment
To dockerize 
 ```bash
 sh scrips/dockerize.sh <version>
 ```
run update version in `release/docker-compose.yaml`
```
 sh scripts/release.sh <version>
```

aaa




