/*
 * Copyright (c) 2020. by Pablo Klaschka
 */
const fs = require('fs');
const path = require('path');
const ch = require('chalk');

const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');

const template = `## [Unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security`;

const newVersion = require('../package.json').version;
const tag = `v${newVersion}`;
const changelogLines = fs
    .readFileSync(changelogPath)
    .toString()
    .split('\n')
    .map((s) => s.trim());

const unreleasedHeadingIndex = changelogLines.findIndex(
    (value) => value === '## [Unreleased]'
);

let previousVersionIndex = -1;
let previousVersionNumber = '';
for (let i = unreleasedHeadingIndex + 1; i < changelogLines.length; i++) {
    if (changelogLines[i].startsWith('## [')) {
        previousVersionIndex = i;
        previousVersionNumber = changelogLines[i].match(/^## \[(.*)].*$/)[1];
        break;
    }
}

console.log(changelogLines, previousVersionIndex);

if (!previousVersionIndex || !previousVersionNumber) {
    console.error('Invalid format. Check your CHANGELOG.md and try again.');
    process.exit(2);
} else {
    console.log(newVersion, previousVersionNumber);
    console.log(ch.bold('Release Notes:'));
}
