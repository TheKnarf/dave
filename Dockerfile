FROM node:14

WORKDIR /app
COPY package.json yarn.lock next.config.js src /app/

RUN yarn
RUN yarn next build

EXPOSE 80

ENTRYPOINT ["yarn", "start", "-p", "80"]
