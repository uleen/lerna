#!/bin/bash
#!/usr/bin/env node --harmony
printf "\n\e[92m[*] Install npm dependencies\e[0m\n"
npm prune
npm install --no-progress --no-optional

printf "\n\e[92m[*] Bootstrap\e[0m\n"
npm run clean
npm run bootstrap

printf "\n\e[92m[*] Build\e[0m\n"
npm run build

printf "\n\e[92mDone\e[0m"
