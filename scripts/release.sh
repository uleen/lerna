#!/bin/bash
set -e

git config --list
git remote -v

GIT_BRANCH=$(git symbolic-ref --short -q HEAD)

printf "\n\e[92m[*] Cleanup git\e[0m\n"
git status
git checkout -- .

printf "\n\e[92m[*] Publish packages\e[0m\n"
if [ "$GIT_BRANCH" = "master" ]; then
    node_modules/.bin/lerna publish --yes --conventional-commits -m "release: Release by ${GIT_BRANCH} %s"
else
    node_modules/.bin/lerna publish --yes --canary
fi

printf "\n\e[92mDone\e[0m"
