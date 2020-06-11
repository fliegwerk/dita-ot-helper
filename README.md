# dita-ot-helper

A little helper for automating some of the more tedious tasks of automation with the DITA Open Toolkit

**Note:** This README is compiled \(using dita-ot-helper\) from the DITA sources in the /samples/readme folder. Direct changes to the README.md will get overwritten.

## Abstract

At its core, the goal of this project is to create an abstraction layer for the DITA Open Toolkit compilation process that "fixes" a few pain-points. These "fixed" \(to a degree\) aspects are:

-   An easy-to-use project file system allowing easy automation
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
-   dita from the [DITA Open Toolkit](https://www.dita-ot.org/), version 3.5+

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

    After a short while, the tool outputs \> Compilation successful.. The document is now compiled.

    If compilation isn't successful, re-run the command using the --verbose option and follow the instructions in the error message shown there.


Your document is now compiled and is in the out folder next to your config.json.

### Exit codes

|Exit Code|Description|
|---------|-----------|
|0|It worked|
|1|Unknown error|
|2|Aborted due to missing dependencies|
|3|Aborted due to non-existent or non-readable config file|
|4|Aborted due to invalid config file|

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
|`input`|`string`|Relative \(to the config.json\) or absolute path to your input file.|
|`transtype`|`string`|The documents transtype.|
|`plugins`|`string[]`|An array of plugin paths. dita-ot-helper will ensure these plugins are installed \(or, if not, try to \(re-\) install them\) before compilation. This accepts a few different types of plugin specifiers documented in the table below.|

#### Plugin specifications

|Type|Behavior|Example|
|----|--------|-------|
|Plugin Name|Installs \(if non-existent\) a plugin by its name from the registry. Similar to dita install|org.lwdita|
|Plugin .zip URL|Installs the plugin from the plugin ZIP file URL \(via the internet\). Similar to dita install|`https://example.com/dita-ot-pdf-plugin.zip`|
|Plugin .zip path|Installs the plugin from the plugin ZIP file path. Similar to `dita install`|`./my-plugin.zip`, `/home/example/plugin.zip`|
|Plugin directory path|\(Re-\) Installs a plugin from its source directory. This is especially useful if you have a customized PDF plugin inside your documentation repository as you can simply specify this plugin and let dita-ot-helper do the work of zipping, installing and using it for you. Similar to zipping the specified directory and running dita install on the zipped file.|`./plugins/com.example.pdf2`|

