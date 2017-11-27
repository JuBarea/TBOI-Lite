const packages = require('gulp-setup/package.json');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ config: packages });
const setup = require('gulp-setup')($, gulp);