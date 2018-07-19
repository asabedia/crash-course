FROM node:8

RUN mkdir -p /usr/app/crash-course-server
WORKDIR /usr/app/crash-course-server

COPY package.json /usr/app/crash-course-server
COPY package-lock.json /usr/app/crash-course-server

RUN npm install

COPY . /usr/app/crash-course-server

EXPOSE 5000
CMD {"npm", "run", "server"}