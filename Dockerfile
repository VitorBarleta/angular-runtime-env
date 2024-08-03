FROM node:lts-alpine as base
WORKDIR /app

FROM nginx:latest as final
EXPOSE 80

FROM base as build
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM final
WORKDIR /app
COPY --from=build /app/dist/todo-app-sandbox/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh .
RUN chmod 777 ./entrypoint.sh
ENV APP_ENVIRONMENT prod
ENTRYPOINT ["./entrypoint.sh"]