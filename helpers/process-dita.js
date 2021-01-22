const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const { zipSync } = require('cross-zip');
const { quote } = require('shell-quote');

function installDITAPlugin(ditaExecPath, pluginPath, silent) {
    console.info(`> Installing plugin ${pluginPath}`);

    const pluginName = path.basename(pluginPath);
    try {
        if (!fs.existsSync(pluginPath)) {
            shell.exec(`${ditaExecPath} install ${pluginName}`, { silent });
        } else if (fs.statSync(pluginPath).isFile()) {
            // ZIP file
            shell.exec(`${ditaExecPath} install ${pluginPath}`, { silent });
        } else if (fs.statSync(pluginPath).isDirectory()) {
            console.info(
                `> Detected local plugin ${pluginName}. Reinstalling...`
            );
            shell.exec(`${ditaExecPath} uninstall ${pluginName}`, {
                silent,
            });
            const zipPath = path.join(shell.tempdir(), pluginName + '.zip');
            zipSync(pluginPath, zipPath);
            shell.exec(`${ditaExecPath} install ${zipPath}`, {
                silent,
            });
        }
    } catch (e) {
        console.warn(
            `Warning: Plugin ${pluginName} couldn't get installed\n${e.message}.\nContinuing.`
        );
    }
}

function getCommand(ditaExecPath, config, configDir) {
    return quote([
        ditaExecPath,
        '-f',
        config['transtype'], // -f argument
        '-i',
        path.resolve(configDir, config['input']), // -i argument
        ...(config['output']
            ? ['-o', path.resolve(configDir, config['output'])]
            : []), // -o argument
        ...(config['propertyfile']
            ? [
                  '--propertyfile',
                  path.resolve(configDir, config['propertyfile']),
              ]
            : []), // --propertyfile argument
        ...(config['resource']
            ? ['-r', path.resolve(configDir, config['resource'])]
            : []), // -r argument
    ]);
}

module.exports = function (ditaExecPath, configPath, config, silent = true) {
    const configDir = path.dirname(path.resolve(process.cwd(), configPath));
    if (config.plugins && config.plugins.length) {
        for (const pluginPath of config.plugins)
            installDITAPlugin(
                ditaExecPath,
                path.join(configDir, pluginPath),
                silent
            );
    }

    const cmd = getCommand(ditaExecPath, config, configDir);

    shell.exec(cmd, {
        silent,
        fatal: true,
        cwd: configDir,
    });
};
