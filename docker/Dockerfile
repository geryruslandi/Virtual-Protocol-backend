FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine AS runner

ENV NODE_ENV production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/database ./database
COPY --from=builder /app/.sequelizerc ./.sequelizerc
COPY --from=builder /app/sequelize-cli-config.js ./sequelize-cli-config.js


COPY .env ./

USER nestjs

EXPOSE 3000

CMD [ "yarn", "start:prod" ]

FROM node:20-alpine AS jestTest

ENV NODE_ENV test
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

CMD [ "yarn", "test" ]


FROM node:20-alpine AS devRunner

ENV NODE_ENV development
WORKDIR /app

COPY . .

EXPOSE ${APP_PORT}

CMD [ "yarn", "start:dev" ]
