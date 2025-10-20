FROM node:18-alpine 
# FROM mirror.gcr.io/library/node:18.20.3-alpine3.20

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 4173

CMD ["pnpm", "run", "serve"]