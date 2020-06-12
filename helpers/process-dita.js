const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const { zipSync } = require('cross-zip');

function installDITAPlugin(ditaExecPath, pluginPath, silent) {
    console.log(`> Installing plugin ${pluginPath}`);

    const pluginName = path.basename(pluginPath);
    try {
        if (!fs.existsSync(pluginPath)) {
            console.log(`${ditaExecPath} install ${pluginName}`);
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

    shell.exec(
        `${ditaExecPath} -f ${config.transtype} -i ${path.join(
            configDir,
            config.input
        )}`,
        {
            silent,
            fatal: true,
            cwd: configDir,
        }
    );
};
