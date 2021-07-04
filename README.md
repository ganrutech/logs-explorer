UP:
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build

DOWN:
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down

Sample Example Log Schema Client:

<!-- {
    "http": {
      "url": {
        "host": "localhost:3200",
        "path": "/admin"
      },
      "request": {
        "method": "GET",
        "headers": {
          "host": "localhost:3200",
          "accepts": "*/*",
          "content-type": "application/json",
          "user-agent": "PostmanRuntime/7.28.1"
        },
        "query": {

        },
        "body": {
          "name": "test-user"
        }
      },
      "response": {
        "status_code": 404,
        "headers": {
          "x-powered-by": "Ganrutech",
          "x-response-time": "1ms",
          "x-correlation-id": "6904333b-cfc4-401a-a5d8-ff03d0b8c5c9",
          "content-type": "application/json; charset=utf-8"
        },
        "body": {
          "error": {
            "code": 404,
            "message": "Not found"
          }
        }
      }
    }
  } -->
