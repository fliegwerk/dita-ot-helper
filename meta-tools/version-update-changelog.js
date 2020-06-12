/*
 * Copyright (c) 2020. by Pablo Klaschka
 *
 * Update the CHANGELOG after the package version has increased. Ideally used as
 * `version` script in the `package.json`.
 *
 * Compatible with the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
 * changelog format.
 *
 * Moves the `## [Unreleased]` section from the changelog into a new
 * release section and re-adds the `## [Unreleased]` template.
 */
const fs = require('fs');
const path = require('path');
const ch = require('chalk');

console.log(ch.italic('Updating changelog...'));

const getComparisonUrl = (prevTag, currTag) =>
    `https://github.com/fliegwerk/dita-ot-helper/compare/${prevTag}...${currTag}`;

const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');

const template = `## [Unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security`.split('\n');

try {
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
            previousVersionNumber = changelogLines[i].match(
                /^## \[(.*)].*$/
            )[1];
            break;
        }
    }

    if (!previousVersionIndex || !previousVersionNumber) {
        console.error(
            ch.red('Invalid format. Check your CHANGELOG.md and try again.')
        );
        process.exit(2);
    } else if (newVersion === previousVersionNumber) {
        console.error(
            ch.red(
                'Unchanged version number. Run this script after the package version number was updated.'
            )
        );
        process.exit(1);
    } else {
        const currentChangelogLines = changelogLines.slice(
            unreleasedHeadingIndex + 1,
            previousVersionIndex - 1
        );

        // Remove empty categories:
        const curatedChangelogLines = currentChangelogLines.filter(
            (line, i) => {
                const isCategory = line.startsWith('###');
                const isEmpty =
                    currentChangelogLines.length <= i + 1 ||
                    currentChangelogLines[i + 1].startsWith('###');
                console.log(isCategory, isEmpty);
                return !(isCategory && isEmpty);
            }
        );

        const newChangelog = [
            ...changelogLines.slice(0, unreleasedHeadingIndex - 1),
            ...template,
            `## [${newVersion}] - ${new Date().toISOString().split('T')[0]}`,
            ...curatedChangelogLines,
            ...changelogLines.slice(
                previousVersionIndex,
                changelogLines.length - 1
            ),
            `[${newVersion}]: ${getComparisonUrl(
                `v${previousVersionNumber}`,
                tag
            )}`,
        ].join('\n');

        fs.writeFileSync(changelogPath, newChangelog, {
            encoding: 'utf-8',
        });

        console.log(ch.bold('Release Notes:'));
        console.log(curatedChangelogLines.join('\n'));
        console.log(ch.italic('Changelog update complete...'));
    }
} catch (e) {
    console.error(ch.red('An unknown error has occured. Details:'), e.message);
    process.exit(1);
}
