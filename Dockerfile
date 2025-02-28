FROM node:22-alpine

WORKDIR /usr/src/app

# Instalar bash
RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install

COPY . .

# Copiar el script wait-for-it.sh al contenedor
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

# Dar permisos de ejecución a wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

RUN npm run build

EXPOSE 8383

CMD [ "npm", "start" ]