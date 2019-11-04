FROM dockerhub.camara.gov.br/infra/node:8.12.0-alpine-3

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD [ "node", "src/main" ]