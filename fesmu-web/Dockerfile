# FROM node:18-alpine
FROM registry.cn-hangzhou.aliyuncs.com/google_containers/node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install
RUN ls -la node_modules/.bin/next 

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
