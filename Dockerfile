FROM node:14
WORKDIR /app
COPY . /app
CMD ["npm","start"]
EXPOSE 80