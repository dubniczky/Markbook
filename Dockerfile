# This is a dockerfile for NodeJS server deployments
# Project: https://gitlab.com/richardnagy/container-environments/server-deployments

FROM node:18

# Expose api port
EXPOSE 8080

# Move source
WORKDIR /app
COPY . .

# Install dependencies
RUN make deploy

# Create user
RUN groupadd --gid 1001 server && \
    useradd --uid 1001 --gid server --shell /bin/bash --create-home server

# Change project ownership to server user
RUN chown -R server:server /app

# Switch user
USER server

# Start app
ENTRYPOINT [ "make" ]

# Command
CMD [ "start" ]
