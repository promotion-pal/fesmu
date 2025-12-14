FROM node:18-alpine

ARG NEXT_PUBLIC_API_URL

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install
RUN ls -la node_modules/.bin/next

COPY . .

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
