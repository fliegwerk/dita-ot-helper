#!/usr/bin/env node
/*
 * Copyright (c) 2020 by Pablo Klaschka
 */
let defaultDitaOTVersion = '3.5.1';

const { program } = require('commander');
const ch = require('chalk');
const checkDependencies = require('./helpers/dependency-check');
const readConfig = require('./helpers/read-config');
const processDita = require('./helpers/process-dita');
const installTempDita = require('./helpers/install-dita-ot');

program
    .name('dita-ot-helper')
    .version(require('./package.json').version)
    .description(
        'A little helper for automating some of the more tedious tasks of automation with the DITA Open Toolkit'
    );

let confFilePath = null;

program.arguments('<conf>').action((conf) => {
    confFilePath = conf;
});

program.option(
    '-v --verbose',
    'Activate verbose output of DITA-OT commands',
    false
);

program.option(
    '-i --install <dita-ot-version>',
    'Download and use a temporary instance of DITA OT (e.g., for CI environments)'
);

program.parse(process.argv);

processConfigFile(confFilePath);

/**
 * Processes a single config file
 * @param {string} configFilePath The path to the JSON config file
 */
async function processConfigFile(configFilePath) {
    console.info('> Checking dependencies');
    checkDependencies(program['install'] ? [] : ['dita']);
    console.info('> Dependency check complete');

    let ditaInstallation = {
        clean: () => {},
        dita: 'dita',
    };

    if (program['install'] !== undefined) {
        const isSpecifiedDitaOTVersionValid =
            typeof program['install'] === 'string' &&
            /^\d+\.\d+(\.\d+)?$/.test(program['install']);

        if (!isSpecifiedDitaOTVersionValid) {
            console.warn(
                ch.yellow(
                    'Invalid DITA version specified. Using version ' +
                        defaultDitaOTVersion
                )
            );
        }

        ditaInstallation = await installTempDita(
            isSpecifiedDitaOTVersionValid
                ? program['install']
                : defaultDitaOTVersion
        );
    }

    console.info('> Reading config file');
    const config = readConfig(configFilePath);
    console.info('> Processing config file');
    processDita(
        ditaInstallation.dita,
        configFilePath,
        config,
        !program['verbose']
    );
    console.info('> Compilation complete. Cleaning up...');
    await ditaInstallation.clean();
    console.info('> Complete');
}
