UP:
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build

DOWN:
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
