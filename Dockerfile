FROM node:9
RUN mkdir /rest-server-stats
ADD . /rest-server-stats
WORKDIR /rest-server-stats
RUN npm i
EXPOSE 80
CMD ["npm", "start"]