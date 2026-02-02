# ---------- build ----------
FROM node:20-alpine AS builder
WORKDIR /sources

COPY package*.json ./
RUN npm ci

COPY nx.json tsconfig.base.json .postcssrc.json ./
COPY apps ./apps
COPY libs ./libs
RUN npx nx run vdesk:build:production

# ---------- runtime ----------
FROM node:20-slim
WORKDIR /app

# Install Chrome dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libgbm1 \
    libasound2 \
	curl \
    jq \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /sources/dist/apps/vdesk/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /sources/dist/apps/vdesk ./

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD curl -f http://127.0.0.1:${WEB_PORT}/health || exit 1

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV WEB_PORT=3000

RUN addgroup --gid 919 nodejs && \
  adduser --uid 919 --gid 919 --disabled-password nodejs

USER nodejs
CMD ["node", "main.js"]
