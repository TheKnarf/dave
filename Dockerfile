# Stage 1 - Build
FROM node:14 AS builder

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn --frosen-lockfile

COPY . /app/
RUN NEXT_TELEMETRY_DISABLED=1 yarn next build


# Stage 2 - Running the app
FROM node:14-alpine

WORKDIR /app
ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
 COPY --from=builder /app/next.config.js ./
#COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 80

ENTRYPOINT ["yarn", "next", "start", "-p", "80"]
