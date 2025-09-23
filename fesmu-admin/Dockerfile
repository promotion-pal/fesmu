# FROM node:18-alpine

# RUN npm install -g pnpm

# WORKDIR /app

# COPY package.json pnpm-lock.yaml* ./

# RUN pnpm install

# COPY . .

# RUN pnpm run build

# EXPOSE 5173

# CMD ["pnpm", "run", "dev"]

FROM mirror.gcr.io/library/node:18-alpine 

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 4173

CMD ["pnpm", "run", "serve"]