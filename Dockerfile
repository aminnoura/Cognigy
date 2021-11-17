FROM node:14.15.0-alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --prod --frozen-lockfile
COPY . .
ARG REACT_APP_COMMIT_SHA
RUN yarn prod

FROM nginx:stable-alpine as production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/prod /usr/share/nginx/html
EXPOSE 80
CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]
