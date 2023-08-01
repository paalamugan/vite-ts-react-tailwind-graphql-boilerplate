# Supported tags and respective Dockerfile links, 17-alpine3.14, 17.4-alpine3.14, 17.4.0-alpine3.14, alpine3.14, current-alpine3.14
FROM node:16-alpine AS builder

USER node

# Set working directory
WORKDIR /app

# Copy package.json and yarn.json with correct user permission
COPY --chown=node:node package.json .npmrc ./

# Installing dependencies
RUN yarn install

# Copy project file and folders to the current working directory (i.e. 'app' folder)
COPY --chown=node:node . ./

FROM builder as dev
ENV NODE_ENV development

# Expose the port the app runs in (3000)
EXPOSE 3000

# Run the app in development mode
CMD ["yarn", "dev"]

FROM builder as prod
ENV NODE_ENV production

# Expose the port the app runs in (8080)
EXPOSE 8080

# Build and Running the app in production mode
CMD  ["yarn", "serve"]