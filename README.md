=================== Docker compose Up/Down ====================

UP:
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build

DOWN:
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml down

=================== Environment Variables ====================
Root
File name: .env
ELK_HOST=
ELK_AUTH_USER=
ELK_AUTH_PASSWORD=

Folder: env/
File name: mongo.env

MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_PORT=
MONGO_DB=

File name: service.env

MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_PORT=
PORT=
MONGO_DB=

JWT_TOKEN_SECRET=
JWT_REFRESH_SECRET=

ELK_INDEX_DEV=
ELK_INDEX_PROD=

=================== Sample Schema ====================

Sample Example Log Schema Client:

<!-- {
  "meta": {
    "http": {
      "url": {
        "host": "localhost",
        "path": "/items/23"
      },
      "request": {
        "method": "GET",
        "headers": {
          "host": "localhost",
          "accepts": "*",
          "content-type": "application/json",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        },
        "query": {},
        "body": {}
      },
      "response": {
        "status_code": 200,
        "headers": {
          "content-type": "application/json",
          "x-correlation-id": "744399f4-f294-461a-a5f3-5f6a9f03ecba"
        },
        "body": {
          "status": "success",
          "data": {"id": 1, "name": "jack"}
        }
      }
    }
  }
} -->
