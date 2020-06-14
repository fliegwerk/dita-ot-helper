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
const { sync: glob } = require('glob');

program
    .name('dita-ot-helper')
    .version(require('./package.json').version)
    .description(
        'A little helper for automating some of the more tedious tasks of automation with the DITA Open Toolkit'
    );

let configPathGlob = null;

program.arguments('<confgGlob>').action((configGlob) => {
    configPathGlob = configGlob;
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

compile(configPathGlob);

/**
 * Processes a single config file
 * @param {string} configFileGlob The path to the JSON config file
 */
async function compile(configFileGlob) {
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

    console.info('> Detecting config files...');
    const configFiles = glob(configFileGlob, {});
    console.info(`> Detected ${configFiles.length} config files:`);
    console.info(configFiles.map((path) => `- ${path}`).join('\n'));
    for (const configFilePath of configFiles) {
        console.info(ch.blue(`> Processing config file ${configFilePath}`));
        console.info(`> Parsing config file...`);
        const config = readConfig(configFilePath);
        console.info('> Processing config file');
        processDita(
            ditaInstallation.dita,
            configFilePath,
            config,
            !program['verbose']
        );
        console.info(`> Processing complete`);
        console.info(ch.green(`> Finished with config file ${configFilePath}`));
    }
    console.info('> Compilation complete. Cleaning up...');
    await ditaInstallation.clean();
    console.info('> Complete');
}
