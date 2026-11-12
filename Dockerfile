# Builds the whole site into plain files and serves them with nginx.
# Coolify builds this file on the VPS and puts it behind helloabdulsamad.com.

FROM node:22-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Next writes /about, the sitemap, robots.txt and the social image to out/.
# The home page and Milo page in site/ go over the top.
RUN STATIC_EXPORT=true npm run build \
 && cp -R site/. out/ \
 && rm -f out/index.txt

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
