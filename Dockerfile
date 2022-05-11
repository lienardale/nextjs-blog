FROM node:latest

ENV NODE_ENV=production
# ENV NODE_ENV=development

WORKDIR /app

USER root

COPY  . .

RUN npm install
RUN npm run build

EXPOSE 3000

# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "start"]%  