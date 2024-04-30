FROM node:21-alpine3.18

RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install dependencies based on the preferred package manager
COPY ./ ./

RUN npm install 
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]