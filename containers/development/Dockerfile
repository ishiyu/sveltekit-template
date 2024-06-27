FROM node:lts-slim AS base
ENV NODE_ENV=development
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential openssl pkg-config \
      git vim curl less procps unzip && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install node modules
WORKDIR /app
COPY ["../../package.json", "../../pnpm-lock.yaml", "/app"]

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules

# Copy application code (ignore node_modules)
COPY ../../src ./src
COPY ../../prisma  ./prisma
COPY ../../static ./static
COPY ../../* .

# generate prisma client code
RUN pnpm prisma generate --schema ./prisma/schema.prisma

# Run and own only the runtime files as a non-root user for security
RUN useradd appuser --create-home --shell /bin/bash && \
    chown -R appuser .

COPY containers/development/entrypoint.sh /usr/bin/
RUN chown appuser:appuser /usr/bin/entrypoint.sh
RUN chmod 755 /usr/bin/entrypoint.sh
USER appuser:appuser

# Start the server by default, this can be overwritten at runtime
ENTRYPOINT ["/usr/bin/entrypoint.sh"]
