const shell = require('shelljs');

/**
 * Checks system dependencies and lists missing dependencies.
 *
 * Exits with exit code `2` if dependencies are missing.
 *
 * @param {string[]} dependencies List of dependencies. I.e., commands that have to be executable in the path.
 */
module.exports = function checkDependencies(dependencies) {
    const missingDependencies = [];

    for (const dependency of dependencies) {
        if (!shell.which(dependency))
            missingDependencies.push(dependency);
    }

    if (missingDependencies.length) {
        console.error('Sorry, but this script requires the following dependencies (which were not found on your system):',
            '\n',
            missingDependencies.map(dependency => `- ${dependency}`).join('\n'))
        shell.exit(2);
    }
}
