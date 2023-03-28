FROM node:18-alpine as base

RUN npm install --global serve
RUN mkdir frontend
WORKDIR frontend
COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
RUN ls -alr

RUN npm run build

CMD ["npx", "serve", "build"]
