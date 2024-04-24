FROM node:20.11.1-slim as builder
WORKDIR /usr/app

COPY . .

RUN yarn install

RUN yarn build auth-api && \
    yarn build authorization-server && \
    yarn build local-account-server

FROM node:20.11.1-slim as production
WORKDIR /usr/app

COPY --from=builder /usr/app/package.json /usr/app/yarn.lock ./
COPY --from=builder /usr/app/dist ./dist
RUN yarn install --production

FROM node:20.11.1-slim as prod-auth-api
WORKDIR /usr/app

COPY --from=production /usr/app/dist/apps/auth-api ./dist/apps/auth-api
COPY --from=production /usr/app/node_modules ./node_modules

CMD ["node","./dist/apps/auth-api/main.js"]


FROM node:20.11.1-slim as prod-authorization-server
WORKDIR /usr/app

COPY --from=production /usr/app/dist/apps/authorization-server ./dist/apps/authorization-server
COPY --from=production /usr/app/node_modules ./node_modules

CMD ["node","./dist/apps/authorization-server/main.js"]

FROM node:20.11.1-slim as prod-local-account-server
WORKDIR /usr/app

COPY --from=production /usr/app/dist/apps/local-account-server ./dist/apps/local-account-server
COPY --from=production /usr/app/node_modules ./node_modules

CMD ["node","./dist/apps/local-account-server/main.js"]


FROM node:20.11.1-slim as dev-auth-api
WORKDIR /usr/app

RUN apt-get update && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/app/ .

CMD ["yarn","start:dev","auth-api"]


FROM node:20.11.1-slim as dev-authorization-server
WORKDIR /usr/app

RUN apt-get update && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/app/ .

CMD ["yarn","start:dev","authorization-server"]

FROM node:20.11.1-slim as dev-local-account-server
WORKDIR /usr/app

RUN apt-get update && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/app/ .

CMD ["yarn","start:dev","local-account-server"]