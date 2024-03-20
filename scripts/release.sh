

# with the new version
set -e

DOCKER_REPO="tiepnt"
DOCKER_COMPOSE_FILE="./release/docker-compose.yaml"


# Kiểm tra nếu người dùng truyền tên và tag từ dòng lệnh
if [ $# -ge 1 ]; then
    TAG="$1"
fi

#tag phải có định dạng \d+\.\d+\.\d+
if [[ ! $TAG =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Tag must be in format x.y.z"
    exit 1
fi

# các image cần thay đổi sẽ có regex như sau : tiepnt/([^:]+):(\d+\.\d+\.\d+)
# thay thế bằng tiepnt/\1:$TAG trong file docker-compose.yml

# thay thế các image trong file docker-compose.yml
sed -i -e "s/:v[0-9]\.[0-9]\.[0-9]/:v$TAG/g" $DOCKER_COMPOSE_FILE 
rm -f $DOCKER_COMPOSE_FILE-e






