#!/bin/bash

lerna clean -y
lerna run clean
rm -rf node_modules

lerna bootstrap