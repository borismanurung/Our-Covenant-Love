#!/bin/sh
set -e

echo "[Docker Entrypoint] Preparing database..."
npx prisma db push --skip-generate || echo "[Warning] prisma db push encountered an issue, continuing..."

echo "[Docker Entrypoint] Ensuring initial content is seeded..."
node prisma/seed.js || echo "[Warning] seed encountered an issue, continuing..."

echo "[Docker Entrypoint] Starting Next.js application..."
exec "$@"
