#!/usr/bin/env node
/*
 * Copyright (c) 2020 by Pablo Klaschka
 */

const { program } = require('commander')
const checkDependencies = require('./helpers/dependency-check')
const readConfig = require('./helpers/read-config')
const processDita = require('./helpers/process-dita')

program
    .name('dita-ot-helper')
    .version(require('./package.json').version)
    .description(
        'A little helper for automating some of the more tedious tasks of automation with the DITA Open Toolkit'
    )

let confFilePath = null

program.arguments('<conf>').action((conf) => {
    confFilePath = conf
})

program.option(
    '-v --verbose',
    'Activate verbose output of DITA-OT commands',
    false
)

program.parse(process.argv)

processConfigFile(confFilePath)

/**
 * Processes a single config file
 * @param {string} configFilePath The path to the JSON config file
 */
function processConfigFile(configFilePath) {
    console.info('> Checking dependencies')
    checkDependencies(['dita'])
    console.info('> Dependency check complete')

    console.info('> Reading config file')
    const config = readConfig(configFilePath)
    console.info('> Processing config file')
    processDita(configFilePath, config, !program['verbose'])
    console.info('> Compilation complete.')
}
