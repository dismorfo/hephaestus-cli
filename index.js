#!/usr/bin/env node

'use strict';

const pkg = require('./package.json');

const program = require('commander');

const hephaestus = require('hephaestus');

const Commands = require('hephaestus-cli-commands');

function before (obj, method, fn) {
  var old = obj[method];
  obj[method] = function () {
    fn.call(this);
    old.apply(this, arguments);
  }
}

// set process title
process.title = 'hephaestus-cli';

before(program, 'outputHelp', function () {
  this.allowUnknownOption();
});

program
  .version(pkg.version)
  .usage('[options] [op]');

new Commands(program);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
