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
- path resolving for `output` config field
### Security
## [0.10.4] - 2020-06-14
### Fixed
- path resolving for `propertyfile`, `resource`, and `output` config fields
## [0.10.3] - 2020-06-14
### Added
- support for specifying a `.properties` file (*`dita --propertyfile=[...]`*, cf. https://www.dita-ot.org/dev/parameters/dita-command-arguments.html) in the JSON configuration file
- support for specifying a resource file (*`dita -r [...]`*, cf. https://www.dita-ot.org/dev/parameters/dita-command-arguments.html) in the JSON configuration file
## [0.10.2] - 2020-06-14
### Added
- support for specifying an output directory in the compilation config file
### Changed
- specified `dita` command argument mappings of config file properties
## [0.10.1] - 2020-06-12
### Added
- `sample-2`: A sample where all one has to do to compile is run `npm install` and `npm start`
### Changed
- removed debug output from `process-dita.js`
## [0.10.0] - 2020-06-12
### Added
- ability to install a temporary DITA-OT instance using the `-i` flag
- documentation comments in the changelog updater script
- folder `README.md` for `meta-tools`
### Changed
- the `processConfigFile` function in `index.js` is now asynchronous
- install temporary DITA instance using `-i` in `meta-tools/compile-readme.js` if no global DITA-OT installation gets detected
## [0.9.8] - 2020-06-12
### Fixed
- fixed bug where lines at the beginning of the changelog get cut off.
## [0.9.7] - 2020-06-12
### Changed
- add empty line at end of changelog in CHANGELOG update script
## [0.9.6] - 2020-06-12
### Fixed
- Removed debug statements from changelog update script
- Use CRLF in changelog update script
- CHANGELOG date of v0.9.4
- Update of the `[Unreleased]` link in the CHANGELOG by the update script
## [0.9.5] - 2020-06-12
### Added
- Changelog
- Changelog version release script
### Changed
- Formatting requirements
## [0.9.4] - 2020-06-12
### Added
- Issue templates
- Code of Conduct
- LICENSE document
- Badges to `README.md`
## [0.9.3] - 2020-06-11
### Fixed
- Ignore CI-downloaded zip file in npm publishing
## [0.9.2] - 2020-06-11
### Changed
- Converted `prepublish` into `prepublishOnly` script
### Fixed
- Bug in npm publishing CI config
## [0.9.1] - 2020-06-11
### Added
- Linting using prettier and ESLint
- DITA-OT installation in CI workflows
### Changed
- File formatting

## v0.9.0 - 2020-06-11
Initial prerelease.

[Unreleased]: https://github.com/fliegwerk/dita-ot-helper/compare/v0.10.4...HEAD
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
