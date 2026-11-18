FROM docker.io/node:24-alpine
ENV NODE_ENV=production
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY . .
USER node
EXPOSE 3000
CMD ["pnpm", "start"]
