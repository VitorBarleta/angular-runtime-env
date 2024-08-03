#!/bin/bash

if [[ -n $APP_ENVIRONMENT ]]; then 
  cd /usr/share/nginx/html/environments;
  mv ./${APP_ENVIRONMENT}/environment.json environment.json;
  find ./ -mindepth 1 -type d -exec rm -r {} +
else echo could not find environment variable; fi

nginx -g 'daemon off;' $@