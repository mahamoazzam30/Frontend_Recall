# syntax=docker/dockerfile:1

# --- Stage 1: dependencies -------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


# --- Stage 2: build --------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so the
# API URL has to be known here rather than at container start. This is the URL
# the *browser* calls, so it's the host-published port — not a name that only
# resolves inside the compose network.
ARG NEXT_PUBLIC_API_URL=http://localhost:8000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


# --- Stage 3: runtime ------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder --chown=node:node /app/.next ./.next

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
