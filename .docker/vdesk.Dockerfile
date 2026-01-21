# ---------- build ----------
FROM node:20-alpine AS builder
WORKDIR /sources

COPY package*.json nx.json tsconfig.base.json .postcssrc.json ./
RUN npm ci

COPY apps ./apps
COPY libs ./libs
RUN npx nx run vdesk:build:production

# ---------- runtime ----------
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /sources/dist/apps/vdesk/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /sources/dist/apps/vdesk ./

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:${WEB_PORT}/health || exit 1

ENV NODE_ENV=production
ENV WEB_PORT=3000
RUN addgroup -g 919 -S nodejs && \
  adduser -S nodejs -u 919 -G nodejs

USER nodejs
CMD ["node", "main.js"]
