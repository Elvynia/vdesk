# ---------- build ----------
FROM node:lts-alpine AS builder
WORKDIR /sources

COPY package*.json ./
RUN npm ci

COPY nx.json tsconfig.base.json .postcssrc.json ./
COPY apps ./apps
COPY libs ./libs
RUN npx nx run vtally:build:production

# ---------- runtime ----------
FROM nginxinc/nginx-unprivileged

RUN rm /etc/nginx/conf.d/default.conf
COPY apps/vtally/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /sources/dist/apps/vtally/browser/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
