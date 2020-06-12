#!/usr/bin/env node
/*
Compiles the project's README.md from the DITA files in `samples/readme`.
 */

const shell = require('shelljs');
const path = require('path');
const ch = require('chalk');

//region paths
const scriptPath = path.join(__dirname, '..', 'index.js');

const readmeSrcFolder = path.join(__dirname, '..', 'samples', 'readme');
const readmeSrcConfigJSONPath = path.join(readmeSrcFolder, 'config.json');
const readMeCompiledSrcPath = path.join(readmeSrcFolder, 'out', 'readme.md');
const readMeDestPath = path.join(__dirname, '..', 'README.md');
//endregion

console.log('Compiling README.md from samples/readme...');

shell.exec(`node ${scriptPath} ${readmeSrcConfigJSONPath}`, {
    fatal: true,
    silent: false,
    cwd: readmeSrcFolder,
});

console.log('Copying compiled README to repository root folder...');

shell.cp(readMeCompiledSrcPath, readMeDestPath);

console.log(ch.green('Successfully compiled README.md'));
