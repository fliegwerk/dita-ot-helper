#!/usr/bin/env node
/*
 * Copyright (c) 2020 by Pablo Klaschka
 */
let defaultDitaOTVersion = '3.6.0';

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
    const options = program.opts();

    console.info('> Checking dependencies');
    checkDependencies(options['install'] ? [] : ['dita']);
    console.info('> Dependency check complete');
    const ditaInstallation = await getDITAInstallation(options);

    console.info('> Detecting config files...');
    const configFiles = glob(configFileGlob, {});
    console.info(`> Detected ${configFiles.length} config files:`);
    console.info(configFiles.map((path) => `- ${path}`).join('\n'));
    processConfigFiles(configFiles, ditaInstallation, options);
    console.info('> Compilation complete. Cleaning up...');
    await ditaInstallation.clean();
    console.info('> Complete');
}

/**
 * Processes the config files in order.
 * @param {string[]} configFiles - the config files
 * @param ditaInstallation - the DITA installation details
 * @param options - the options passed to the CLI
 */
function processConfigFiles(configFiles, ditaInstallation, options) {
    for (const configFilePath of configFiles) {
        console.info(ch.blue(`> Processing config file ${configFilePath}`));
        console.info(`> Parsing config file...`);
        const config = readConfig(configFilePath);
        console.info('> Processing config file');
        processDita(
            ditaInstallation.dita,
            configFilePath,
            config,
            !options['verbose']
        );
        console.info(`> Processing complete`);
        console.info(ch.green(`> Finished with config file ${configFilePath}`));
    }
}

/**
 * Checks the DITA version passed in `options['install']` for validity.
 *
 * Logs a warning stating dita-ot-helper will use the default version if the
 * version is not valid.
 *
 * @param options - the options passed to the CLI
 * @return {boolean} `true` if the version is valid and can be used
 */
function checkDITAVersionToInstall(options) {
    const isSpecifiedDitaOTVersionValid =
        typeof options['install'] === 'string' &&
        /^\d+\.\d+(\.\d+)?$/.test(options['install']);

    if (!isSpecifiedDitaOTVersionValid) {
        console.warn(
            ch.yellow(
                'Invalid DITA version specified. Using version ' +
                    defaultDitaOTVersion
            )
        );
    }
    return isSpecifiedDitaOTVersionValid;
}

/**
 * Gets a DITA installation and, if specified in `options`, installs a temporary one.
 * @param options - the options passed to the CLI
 * @return {Promise<{clean: function(), dita: string}>} the specification of
 * the dir including a `clean` function for cleaning temporary installations,
 * if applicable
 */
async function getDITAInstallation(options) {
    let ditaInstallation = {
        clean: () => {},
        dita: 'dita',
    };

    if (options['install'] !== undefined) {
        const isSpecifiedDitaOTVersionValid =
            checkDITAVersionToInstall(options);

        ditaInstallation = await installTempDita(
            isSpecifiedDitaOTVersionValid
                ? options['install']
                : defaultDitaOTVersion
        );
    }
    return ditaInstallation;
}
