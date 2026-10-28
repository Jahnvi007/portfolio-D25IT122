FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN npm install --global serve

COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5173"]
