/*
 * Copyright (c) 2020. by Pablo Klaschka
 */
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const ch = require('chalk');
const { unzipSync } = require('cross-zip');
const fetch = require('node-fetch');

const tempDir = shell.tempdir();

/**
 * DITA OT, in its release numbers, drops a trailing `'.0'`, i.e., `3.6.0` => `3.6`
 *
 * This function converts a valid semantic version number to the DITA OT equivalent.
 * @param version
 * @return {string}
 */
const getCorrectedVersion = (version) => {
    if (version.endsWith('.0')) {
        version = version.substring(0, version.length - 2);
    }
    return version;
};

const getDownloadLink = (version) => {
    version = getCorrectedVersion(version);

    return `https://github.com/dita-ot/dita-ot/releases/download/${version}/dita-ot-${version}.zip`;
};

/**
 *
 * @param {string} version the DITA-OT version number
 */
async function downloadDitaOT(version) {
    try {
        console.info(`> Downloading DITA-OT ${version}`);
        const res = await fetch(getDownloadLink(version));

        console.info(`> Download complete, unzipping...`);
        const zipPath = path.join(tempDir, 'dita.zip');
        fs.writeFileSync(zipPath, await res.buffer(), 'binary');

        // const ditaDir = path.join(tempDir, 'dita');
        const ditaDir = fs.mkdtempSync(path.join(tempDir, 'dita-ot-helper'));

        unzipSync(zipPath, ditaDir);
        console.info(`> Unzipping complete...`);

        return {
            dita: path.join(
                ditaDir,
                `dita-ot-${getCorrectedVersion(version)}`,
                'bin',
                'dita'
            ),
            clean: () => shell.rm('-rf', ditaDir),
        };
    } catch (e) {
        console.error(ch.red(e.message));
        shell.exit(5);
    }
}

module.exports = downloadDitaOT;
