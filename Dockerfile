# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve built assets
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
LABEL org.opencontainers.image.source="https://github.com/Beast12/christmas-family-game"
EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
