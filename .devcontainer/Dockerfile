FROM ubuntu:20.04

RUN apt update

RUN apt install build-essential -y
RUN apt install python3 -y

RUN apt install git -y
RUN apt install vim -y

RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install nodejs -y
# install lerna globally so we don't have to install it by running `npm install`
# this way we can use only lerna to install all the dependencies
RUN npm install --global lerna@^5.5.0