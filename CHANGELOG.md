# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
## [0.13.0] - 2021-01-18
### Changed
- Set default DITA OT version to `3.6.0`
- switched from `request` to `node-fetch`, reducing the package size significantly
### Fixed
- Support for `.0` versions, e.g., `3.6.0`
## [0.12.1] - 2021-01-18
### Changed
- Updated `commander` dependency to `v7.0.0`
## [0.12.0] - 2020-12-03

### Fixed

-   `propertyfile` option now gets passed to the `dita` command correctly

## [0.11.1] - 2020-06-14

### Fixed

-   Issues in the [README.md](README.md)

## [0.11.0] - 2020-06-14

### Added

-   Support for glob patterns to compile multiple JSON config files at once
-   `samples/sample-3` to demonstrate glob support

### Changed

-   enhanced CLI output

## [0.10.5] - 2020-06-14

### Fixed

-   path resolving for `output` config field

## [0.10.4] - 2020-06-14

### Fixed

-   path resolving for `propertyfile`, `resource`, and `output` config fields

## [0.10.3] - 2020-06-14

### Added

-   support for specifying a `.properties` file (_`dita --propertyfile=[...]`_, cf. https://www.dita-ot.org/dev/parameters/dita-command-arguments.html) in the JSON configuration file
-   support for specifying a resource file (_`dita -r [...]`_, cf. https://www.dita-ot.org/dev/parameters/dita-command-arguments.html) in the JSON configuration file

## [0.10.2] - 2020-06-14

### Added

-   support for specifying an output directory in the compilation config file

### Changed

-   specified `dita` command argument mappings of config file properties

## [0.10.1] - 2020-06-12

### Added

-   `sample-2`: A sample where all one has to do to compile is run `npm install` and `npm start`

### Changed

-   removed debug output from `process-dita.js`

## [0.10.0] - 2020-06-12

### Added

-   ability to install a temporary DITA-OT instance using the `-i` flag
-   documentation comments in the changelog updater script
-   folder `README.md` for `meta-tools`

### Changed

-   the `processConfigFile` function in `index.js` is now asynchronous
-   install temporary DITA instance using `-i` in `meta-tools/compile-readme.js` if no global DITA-OT installation gets detected

## [0.9.8] - 2020-06-12

### Fixed

-   fixed bug where lines at the beginning of the changelog get cut off.

## [0.9.7] - 2020-06-12

### Changed

-   add empty line at end of changelog in CHANGELOG update script

## [0.9.6] - 2020-06-12

### Fixed

-   Removed debug statements from changelog update script
-   Use CRLF in changelog update script
-   CHANGELOG date of v0.9.4
-   Update of the `[Unreleased]` link in the CHANGELOG by the update script

## [0.9.5] - 2020-06-12

### Added

-   Changelog
-   Changelog version release script

### Changed

-   Formatting requirements

## [0.9.4] - 2020-06-12

### Added

-   Issue templates
-   Code of Conduct
-   LICENSE document
-   Badges to `README.md`

## [0.9.3] - 2020-06-11

### Fixed

-   Ignore CI-downloaded zip file in npm publishing

## [0.9.2] - 2020-06-11

### Changed

-   Converted `prepublish` into `prepublishOnly` script

### Fixed

-   Bug in npm publishing CI config

## [0.9.1] - 2020-06-11

### Added

-   Linting using prettier and ESLint
-   DITA-OT installation in CI workflows

### Changed

-   File formatting

## v0.9.0 - 2020-06-11

Initial prerelease.

[unreleased]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.11.1...HEAD
[0.9.1]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.0...v0.9.1
[0.9.2]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.1...v0.9.2
[0.9.3]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.2...v0.9.3
[0.9.4]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.3...v0.9.4
[0.9.5]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.4...v0.9.5
[0.9.6]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.5...v0.9.6
[0.9.7]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.6...v0.9.7
[0.9.8]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.7...v0.9.8
[0.10.0]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.9.8...v0.10.0
[0.10.1]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.10.0...v0.10.1
[0.10.2]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.10.1...v0.10.2
[0.10.3]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.10.2...v0.10.3
[0.10.4]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.10.3...v0.10.4
[0.10.5]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.10.4...v0.10.5
[0.11.0]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.10.5...v0.11.0
[0.11.1]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.11.0...v0.11.1
[0.12.0]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.11.1...v0.12.0
[0.12.1]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.12.0...v0.12.1
[0.13.0]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.12.1...v0.13.0
