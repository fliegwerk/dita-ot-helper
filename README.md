# dita-ot-helper

[![CI](https://github.com/fliegwerk/dita-ot-helper/workflows/CI/badge.svg)](https://github.com/fliegwerk/dita-ot-helper/actions?query=workflow%3ACI) [![DeepScan Grade](https://deepscan.io/api/teams/9705/projects/12290/branches/188095/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9705&pid=12290&bid=188095) [![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/fliegwerk/dita-ot-helper)](https://github.com/fliegwerk/dita-ot-helper/security) [![NPM package version](https://img.shields.io/npm/v/dita-ot-helper)](https://www.npmjs.com/package/dita-ot-helper) ![Minzipped npm package size](https://img.shields.io/bundlephobia/minzip/dita-ot-helper)

A little helper for automating some of the more tedious tasks of automation with the DITA Open Toolkit

**Note:** This README is compiled \(using dita-ot-helper\) from the DITA sources in the /samples/readme folder. Direct changes to the README.md will get overwritten.

## Abstract

At its core, the goal of this project is to create an abstraction layer for the DITA Open Toolkit compilation process that "fixes" a few pain-points. These "fixed" \(to a degree\) aspects are:

-   An easy-to-use project file system allowing easy automation
-   Installing DITA-OT in autonomous environments \(such as Continuous Integration\)
-   DITA OT Plugin dependencies \(local and remote\) for specific compilations
-   Local plugin reinstallation from a development directory. A documentation repository contains a customized PDF plugin in a folder. dita-ot-helper automatically \(re-\) installs this plugin before compiling.

A config file can look as simple as this:

```
{
  "input": "input.dita",
  "plugins": [
    "org.dita.pdf2",
    "./org.mypdf.plugin"
  ],
  "transtype": "companyPDF"
}
```

This automatically compiles using the local org.mypdf.plugin folder's plugin. It also uses the companyPDFtranstype this plugin might defines.

With this config file, everything involved in compiling this \(without the plugin being pre-installed etc.\) is running

```
$ dita-ot-helper config.json
```

from your command line. It's as easy as that.

## Documentation

### Dependencies

-   NodeJS, v10+
-   on Windows: .NET Framework 4.5+ and Powershell 3 \(preinstalled on WIndows 8+\)
-   **Optional:** dita from the [DITA Open Toolkit](https://www.dita-ot.org/), version 3.5+ \(can also be installed temporarily using the helper!\)

### Install dita-ot-helper

1.  Install the dita-ot-helper using npm

    Run

    ```
    $ npm install -g dita-ot-helper
    ```

    in your command line


dita-ot-helper is now installed on your computer.

### Compile DITA documents

Compiling DITA documents using the dita-ot-helper

1.  Create a config.json for your project.

    The config.json defines how your document gets compiled.

    **Note:** You can find a few examples for configurations in the repositories samples directory. All options of the config file are documented below in the [JSON Config File](#json_config_file) section.

    In this case, we want to compile a document.ditamap file using the markdown transtype. Our config.json \(next to our DITA map file\) could therefore look like this:

    ```
    {
        "input": "document.ditamap",
        "plugins": ["org.lwdita"],
        "transtype": "markdown"
    }
    ```

2.  Compile your document using the dita-ot-helper

    In your command line, run:

    ```
    $ dita-ot-helper config.json
    ```

    **Note:** By default, the DITA command output is hidden. To enable it, use the -v or --verbose argument in your command:

    ```
    $ dita-ot-helper -v config.json
    ```

    **Tip:** **Compiling documents without having DITA-OT installed on your system**

    It's possible to compile documents using the helper without having DITA-OT installed. In this case, just add the -i or --install argument to your command. You can also specify a specific version of DITA-OT. This then installs the specified version of DITA-OT in a temporary location \(this gets deleted after the command is run\).

    This is especially useful for autonomous environments such as Continuous Integration as it allows you to compile DITA documents with one command without a lot of setup.

    After a short while, the tool outputs \> Compilation successful.. The document is now compiled.

    If compilation isn't successful, re-run the command using the --verbose option and follow the instructions in the error message shown there.


Your document is now compiled and is in the out folder next to your config.json.

### Compile multiple documents

Compile multiple documents with one command using glob patterns

The CLI makes use of the node [glob](https://www.npmjs.com/package/glob) library. For possible glob patterns and other information, please refer to their documentation. Basic knowledge of glob patterns is required to fully understand this task.

When you have multiple configurations, e.g., for multiple maps and/or multiple deliverables per map, it is possible to compile all of them using just one command.

To provide an example, we'll assume you have the following directory structure \(samples/sample-3 provides a similar example\):

```
./ (current working directory)
    end-user-manual-pdf.json (input => ./end-user-manual.ditamap) 
    end-user-manual-html.json (input => ./end-user-manual.ditamap)
    end-user-manual.ditamap (A DITA map)
    [...] (DITA documents)
```

**Tip:** To avoid confusion, we suggest to specify individual output directories in your configuration files for each configuration. This way, each configuration will have exactly one corresponding output directory.

1.  Run the dita-ot-helper command using a glob pattern to match your configuration files

    The same patterns as with [Compile DITA documents](#compile_dita_documents) apply here. The only difference is using a glob pattern instead of the file name of a config file.

    In our example from above, we need to run

    ```
    $ dita-ot-helper end-user-manual-*.json
    ```

    dita-ot-helper will process \(i.e., compile\) all the JSON files matching the patterns.


All configurations are compiled.

**Related information**  


[https://www.npmjs.com/package/glob](https://www.npmjs.com/package/glob)

### Exit codes

|Exit Code|Description|
|---------|-----------|
|0|It worked|
|1|Unknown error|
|2|Aborted due to missing dependencies|
|3|Aborted due to non-existent or non-readable config file|
|4|Aborted due to invalid config file|
|5|Something went wrong while installing DITA-OT using the -i flag|

### JSON Config File

The project configuration file for the dita-ot-helper tool.

Using a JSON config file \(which is required for using dita-ot-helper\), you can define:

-   required plugins
-   the project input file
-   the transtype that should get used

The tool will then automatically install the plugins and compile the document according to those specifications.

Below, you can find all the options you can put into your configuration file.

**Note:** Your configuration file can have any possible filename. However, we recommend using dita-ot-helper.json or config.json for clarity.

#### JSON object properties

|JSON field|Type|Description|
|----------|----|-----------|
|`input`|`string`|Relative \(to the config.json\) or absolute path to your input file. Gets passed to the `-i` argument of the dita command.|
|`output`|`string`|Relative \(to the config.json\) or absolute path of the output directory of the compiled file. Gets passed to the `-o` argument of the dita command.|
|`propertyfile`|`string`|Relative \(to the config.json\) or absolute path of a .properties file. Gets passed to the `--propertyfile` argument of the dita command.|
|`resource`|`string`|Relative \(to the config.json\) or absolute path to a resource file, e.g., a map containing key definitions. Gets passed to the `-r` argument of the dita command.|
|`plugins`|`string[]`|An array of plugin paths. dita-ot-helper will ensure these plugins are installed \(or, if not, try to \(re-\) install them\) before compilation. This accepts a few different types of plugin specifiers documented in the table below.|
|`transtype`|`string`|The documents transtype. Gets passed to the `-f` argument of the dita command.|

#### Plugin specifications

|Type|Behavior|Example|
|----|--------|-------|
|Plugin Name|Installs \(if non-existent\) a plugin by its name from the registry. Similar to dita install|org.lwdita|
|Plugin .zip URL|Installs the plugin from the plugin ZIP file URL \(via the internet\). Similar to dita install|`https://example.com/dita-ot-pdf-plugin.zip`|
|Plugin .zip path|Installs the plugin from the plugin ZIP file path. Similar to `dita install`|`./my-plugin.zip`, `/home/example/plugin.zip`|
|Plugin directory path|\(Re-\) Installs a plugin from its source directory. This is especially useful if you have a customized PDF plugin inside your documentation repository as you can simply specify this plugin and let dita-ot-helper do the work of zipping, installing and using it for you. Similar to zipping the specified directory and running dita install on the zipped file.|`./plugins/com.example.pdf2`|

**Related information**  


[https://www.dita-ot.org/dev/topics/build-using-dita-command.html](https://www.dita-ot.org/dev/topics/build-using-dita-command.html)

