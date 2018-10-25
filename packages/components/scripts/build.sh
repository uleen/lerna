#!/bin/bash
set -e
export NODE_ENV=production
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1

printf "\n\e[92m[*] Clean ./dist directory\e[0m\n"
rm -rf ./dist && echo "Done"

printf "\n\e[92m[*] Build the distribution code\e[0m\n"
node_modules/.bin/webpack --mode production --config scripts/webpack/webpack.prod.js --color -p --hide-modules --display-optimization-bailout

printf "\n\e[92mDone\e[0m"
