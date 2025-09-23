FROM mirror.gcr.io/library/node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install
RUN ls -la node_modules/.bin/next 

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
