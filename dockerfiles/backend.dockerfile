FROM node:14

WORKDIR /app

COPY package.json /app

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ];\
    then npm install;\
    else npm install --only=production;\
    fi

COPY . /app

CMD [ "node", "app.js" ]