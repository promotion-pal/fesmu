# FROM node:18-alpine 
FROM registry.cn-hangzhou.aliyuncs.com/google_containers/node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 4173

CMD ["pnpm", "run", "serve"]