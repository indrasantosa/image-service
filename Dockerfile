FROM node:14.17.3-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY ormconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:14.17.3-alpine
WORKDIR /usr
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","index.js"]