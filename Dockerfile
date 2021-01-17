FROM node:latest
 
RUN mkdir -p /home/www/weather_service
WORKDIR /home/www/weather_service
 
COPY . /home/www/weather_service
 
RUN npm install
 
EXPOSE 3000
 
ENTRYPOINT ["npm", "run"]
CMD ["start"]