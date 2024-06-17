#!/bin/sh

# This script is used to deploy the app to staging

git branch -D preview
git checkout -b preview
git push origin +preview
git checkout main