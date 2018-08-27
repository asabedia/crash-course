FROM node:8

RUN mkdir -p /usr/app/crash-course-client
WORKDIR /usr/app/crash-course-client

COPY package.json /usr/app/crash-course-client

RUN npm install

COPY . /usr/app/crash-course-client

CMD {"npm", "start"}