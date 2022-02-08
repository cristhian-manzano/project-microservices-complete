# Star project

## Create mongodb instance with docker

    docker run --name user-services-db -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=password mongo:4.4.12
