FROM node:16 as build

WORKDIR /app

COPY . .
RUN npm install lerna --global
RUN lerna bootstrap
RUN lerna link

RUN npm -w @auth.hasanjoldic.com/api run build

CMD ["npm", "-w", "@auth.hasanjoldic.com/api", "run", "start"]
