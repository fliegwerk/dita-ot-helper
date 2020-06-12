const fs = require('fs');
const path = require('path');

/**
 * Reads a config file
 *
 * Exits with exit code `3` if file could not be read.
 * @param {string} configFilePath The path to a JSON config file (absolute or relative from CWD)
 * @return {*} the JSON config file contents
 */
module.exports = function (configFilePath) {
    const realPath = path.resolve(process.cwd(), configFilePath);

    if (fs.existsSync(realPath) && fs.statSync(realPath).isFile()) {
        const jsonText = fs.readFileSync(realPath).toString();
        try {
            return JSON.parse(jsonText);
        } catch (e) {
            console.error(
                'Could not read JSON data in config file. Please re-check the validity of your config file'
            );
            process.exit(4);
        }
    } else {
        console.error(
            `Could not read config file at ${realPath}. Please check that the process has permission to read that file.`
        );
        process.exit(3);
    }
};
