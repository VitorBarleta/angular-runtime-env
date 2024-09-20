FROM node:lts-slim AS base
WORKDIR /app

FROM nginx:latest AS final
EXPOSE 80

FROM base AS build
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM final
WORKDIR /app
COPY --from=build /app/dist/app-sandbox/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh .
RUN apt update && apt install dos2unix -y && dos2unix entrypoint.sh
RUN chmod +x ./entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]