FROM node:8

RUN mkdir -p /usr/app/crash-course-server
WORKDIR /usr/app/crash-course-server

COPY package.json /usr/app/crash-course-server

RUN npm install

COPY . /usr/app/crash-course-server

CMD {"npm", "run", "start"}