# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app
# Speeds up npm/yarn and fixes musl vs glibc issues for some packages
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:1.27-alpine AS runner
RUN printf "types { application/manifest+json webmanifest; }\n" > /etc/nginx/conf.d/webmanifest.types

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
