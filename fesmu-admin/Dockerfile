FROM node:18-alpine

ARG VITE_API_URL

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

ENV VITE_API_URL=${VITE_API_URL}

RUN pnpm run build

EXPOSE 4173

CMD ["pnpm", "run", "serve"]
