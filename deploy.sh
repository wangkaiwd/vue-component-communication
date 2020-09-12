#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# push file from local master branch to remote repository address git@github.com:wangkaiwd/vue-component-communication.git gh-pages branch
# https://www.ruanyifeng.com/blog/2014/06/git_remote.html
 git push -f git@github.com:wangkaiwd/vue-component-communication.git master:gh-pages

# back to previous location
cd -

# remove dist file
rm -rf dist
