FROM node:14

WORKDIR /app
COPY . /app/

RUN yarn
RUN NEXT_TELEMETRY_DISABLED=1 yarn next build

EXPOSE 80

ENTRYPOINT ["yarn", "start", "-p", "80"]
