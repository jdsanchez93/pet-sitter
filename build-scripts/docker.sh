#!/bin/bash
set -e
IMAGE_TAG=$1

IFS='/' read -ra SPLIT <<< "$GITHUB_REPOSITORY"
echo ${SPLIT[1]}

IMAGE_PREFIX="jdeeezy/${SPLIT[1]}:"
IMAGE_NAME="$IMAGE_PREFIX$IMAGE_TAG"

docker build . --file Dockerfile --tag $IMAGE_NAME
docker push $IMAGE_NAME

# push tag if second arg is not blank
if [ ! -z "$2" ]; then
    git tag $2
    git push origin $2
fi

echo "image=$IMAGE_NAME" >> $GITHUB_OUTPUT