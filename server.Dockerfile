FROM node:16.14.2
RUN npm i -g @nestjs/cli && npm i -g pnpm
WORKDIR /usr/src/app
USER node