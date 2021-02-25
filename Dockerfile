FROM node:13-alpine as build
WORKDIR /app
RUN npm install -g @ionic/cli
COPY ./package*.json ./
RUN npm install
COPY ./src ./src
COPY ./*.* ./
RUN npm run-script build:prod

FROM nginx
COPY ./others/nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/