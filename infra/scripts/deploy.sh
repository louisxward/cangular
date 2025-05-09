#!/bin/bash
echo DEPLOYMENT - START
cd /home/git/repositories/cangular/infra/app
echo DEPLOYMENT - git pull
git pull
echo DEPLOYMENT - docker build
docker compose build
echo DEPLOYMENT - docker up
docker compose up -d
echo DEPLOYMENT - END