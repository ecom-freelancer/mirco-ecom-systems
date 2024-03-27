# build add packages and push to docker hub
# eg: sh scripts/dockerize.sh 1.0.0
#!/bin/bash
DOCKER_REPO="tiepnt"
REPO="ecom-80"
CONTEXT="."


# nếu có lỗi trong quá trình chạy thì throw error và thoát

set -e

# Kiểm tra nếu người dùng truyền tên và tag từ dòng lệnh
if [ $# -ge 1 ]; then
    TAG="$1"
    NEXT_TAG="v$TAG"
fi

#nếu không có tag thì sẽ tả về lỗi
if [ -z "$TAG" ]; then
    echo "Usage: $0 <tag>"
    exit 1
fi

#tag phải có định dạng \d+\.\d+\.\d+
if [[ ! $TAG =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Tag must be in format x.y.z"
    exit 1
fi

yarn && yarn build:all

# Thư mục của consumer
CONSUMER_APP_DIR="sites/consumer-app/Dockerfile"
CONSUMER_SERVER_DIR="sites/consumer-server/Dockerfile"

# Thư mục của admin
ADMIN_SERVER_DIR="sites/admin-server/Dockerfile"
ADMIN_APP_DIR="sites/admin-site/Dockerfile"

# Build and pull
docker build  --platform=linux/amd64 -t "$DOCKER_REPO/$REPO-admin-server:$NEXT_TAG" $CONTEXT  -f $ADMIN_SERVER_DIR 
docker build  --platform=linux/amd64 -t "$DOCKER_REPO/$REPO-admin-site:$NEXT_TAG" $CONTEXT -f $ADMIN_APP_DIR 
docker build  --platform=linux/amd64 -t "$DOCKER_REPO/$REPO-consumer-app:$NEXT_TAG" $CONTEXT -f $CONSUMER_APP_DIR 
docker build  --platform=linux/amd64 -t "$DOCKER_REPO/$REPO-consumer-server:$NEXT_TAG" $CONTEXT -f $CONSUMER_SERVER_DIR 



docker push "$DOCKER_REPO/$REPO-admin-server:$NEXT_TAG"
docker push "$DOCKER_REPO/$REPO-admin-site:$NEXT_TAG"
docker push "$DOCKER_REPO/$REPO-consumer-app:$NEXT_TAG"
docker push "$DOCKER_REPO/$REPO-consumer-server:$NEXT_TAG"

