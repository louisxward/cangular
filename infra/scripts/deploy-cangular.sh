#!/bin/bash
echo --- start - deploy-cangular ---
cd /opt/cangular/
eval $(ssh-agent -s);
ssh-add ~/.ssh/git;
git fetch --all
git reset --hard origin/main
git pull origin main;
source ~/.nvm/nvm.sh;
npm i;
ng build --configuration=production;
rm -r ../cangular-server/dist;
cp -r ./dist/frontend ../cangular-server/dist;
pm2 restart cangular;
echo --- end - deploy-cangular ---