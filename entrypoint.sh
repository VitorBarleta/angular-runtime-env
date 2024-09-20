#!/bin/bash

if [[ -n $APP_ENVIRONMENT ]]; then 
  cd /usr/share/nginx/html/environments;
  mv /usr/share/nginx/html/environments/${APP_ENVIRONMENT}/environment.json /usr/share/nginx/html/environments/environment.json;
  find /usr/share/nginx/html/environments -mindepth 1 -type d -exec rm -r {} +
else echo could not find environment variable; fi

nginx -g 'daemon off;' $@