FROM node:18-alpine

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости через pnpm
RUN pnpm install

# Копируем остальные файлы
COPY . .

# Собираем проект (для бэкенда)
RUN pnpm run build

EXPOSE 3002

# Запускаем приложение
CMD ["pnpm", "run", "dev"]


# FROM node:18-alpine AS base

# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
# RUN \
#     if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#     elif [ -f package-lock.json ]; then npm ci; \
#     elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#     else echo "Lockfile not found." && exit 1; \
#     fi


# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# RUN \
#     if [ -f yarn.lock ]; then yarn run build; \
#     elif [ -f package-lock.json ]; then npm run build; \
#     elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#     else echo "Lockfile not found." && exit 1; \
#     fi

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3002


# ENV HOSTNAME="0.0.0.0"
# CMD ["node", "server.js"]
