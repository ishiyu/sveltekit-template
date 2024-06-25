FROM node:lts-slim
ENV NODE_ENV=development

# Svelte app lives here
WORKDIR /app

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential openssl pkg-config \
      git vim curl less procps unzip && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install node modules
#COPY ../../prisma ./prisma/

# Clean install
COPY ["../../package.json", "../../pnpm-lock.yaml", "./"]
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile

# generate prisma client code
#RUN npx prisma generate --schema ./prisma/postgresql/schema.prisma

# Copy application code (ignore node_modules)
COPY ../../src ./src
COPY ../../static ./static
COPY ../../* .

# Run and own only the runtime files as a non-root user for security
RUN useradd appuser --create-home --shell /bin/bash && \
    chown -R appuser .

COPY containers/development/entrypoint.sh /usr/bin/
RUN chown appuser:appuser /usr/bin/entrypoint.sh
RUN chmod 755 /usr/bin/entrypoint.sh
USER appuser:appuser

# Start the server by default, this can be overwritten at runtime
ENTRYPOINT ["/usr/bin/entrypoint.sh"]
