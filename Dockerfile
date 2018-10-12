FROM node:8-slim
WORKDIR /typechain
COPY . /typechain
RUN npm install
EXPOSE 8191
CMD [ "npm", "run", "build" ]
ENTRYPOINT ["npm", "run", "exe"]
