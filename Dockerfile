# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Build args for Next.js public env vars (these must be available at build time)
ARG NEXT_PUBLIC_ADAY_API_URL
ARG NEXT_PUBLIC_ADAY_API_URL_V1
ARG NEXT_PUBLIC_ADAY_API_URL_V2
ARG NEXT_PUBLIC_ADAY_JSREPORT_URL
ARG NEXT_PUBLIC_ADAY_AUTH_API_URL

# Expose build args as environment variables so Next.js can read them during build
ENV NEXT_PUBLIC_ADAY_API_URL=${NEXT_PUBLIC_ADAY_API_URL}
ENV NEXT_PUBLIC_ADAY_API_URL_V1=${NEXT_PUBLIC_ADAY_API_URL_V1}
ENV NEXT_PUBLIC_ADAY_API_URL_V2=${NEXT_PUBLIC_ADAY_API_URL_V2}
ENV NEXT_PUBLIC_ADAY_JSREPORT_URL=${NEXT_PUBLIC_ADAY_JSREPORT_URL}
ENV NEXT_PUBLIC_ADAY_AUTH_API_URL=${NEXT_PUBLIC_ADAY_AUTH_API_URL}

# Copy package files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies
RUN npm install --frozen-lockfile || npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install only production dependencies
RUN npm install --frozen-lockfile --production || npm install --production

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
