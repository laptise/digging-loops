FROM node:16.14.2
RUN npm i -g pnpm && npx next -h && pnpm install -E --save-optional @next/swc-linux-arm64-gnu && pnpm install
WORKDIR /usr/src/app
USER node