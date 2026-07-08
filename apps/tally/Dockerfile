# ---------- build ----------
FROM node:lts-alpine AS builder
WORKDIR /sources

COPY package*.json ./
RUN npm ci

COPY nx.json tsconfig.base.json .postcssrc.json ./
COPY apps ./apps
COPY libs ./libs
RUN npx nx run tally:build:production

# ---------- runtime ----------
FROM nginxinc/nginx-unprivileged

RUN rm /etc/nginx/conf.d/default.conf
COPY apps/tally/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /sources/dist/apps/tally/browser/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
