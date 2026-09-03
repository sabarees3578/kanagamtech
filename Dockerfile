# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# The app listens on $PORT (or defaults to 3000) and binds to 0.0.0.0,
# so cloud hosts / Coolify can route to it via the injected PORT env var.
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# NITRO_HOST=0.0.0.0 forces binding to all interfaces even if the host
# injects a HOST/NITRO_HOST value; PORT flows through from the host.
CMD ["sh", "-c", "NITRO_HOST=0.0.0.0 node .output/server/index.mjs"]
