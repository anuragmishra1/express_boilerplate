FROM node

COPY . /app
WORKDIR /app
RUN npm install --production

EXPOSE 3003

ENTRYPOINT ["npm", "start"]
