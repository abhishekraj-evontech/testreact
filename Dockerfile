FROM nginx
 
LABEL maintainer "abhishek"
ENV REFRESHED_AT 2018-12-20
 
RUN apt-get update && \
    apt-get install -y curl vim gnupg2 gnupg1 git  && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs && \
    mkdir -p /usr/src/bankapp
 
ENV APP_PATH /usr/src/bankapp
WORKDIR $APP_PATH

COPY package.json $APP_PATH
RUN npm install

 
 
EXPOSE 80

COPY . /usr/src/bankapp
RUN rm -rf /usr/share/nginx/html/* && \
    chmod +x /usr/src/bankapp/entrypoint.sh && \
    cp nginx.conf /etc/nginx/nginx.conf && \
    cp default.conf /etc/nginx/conf.d/ 

ENTRYPOINT ["/usr/src/bankapp/entrypoint.sh"]