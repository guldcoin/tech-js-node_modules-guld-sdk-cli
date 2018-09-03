# guld-sdk-cli

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-sdk-cli) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-sdk-cli/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/cli/guld-sdk-cli.html)

[![node package manager](https://img.shields.io/npm/v/guld-sdk-cli.svg)](https://www.npmjs.com/package/guld-sdk-cli) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-sdk-cli.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-sdk-cli?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-sdk-cli.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-sdk-cli/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-sdk-cli/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-sdk-cli) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-sdk-cli/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-sdk-cli?type=dev)

Software Developer Kit for guld JS packages.

### Install

##### Node

```sh
npm i -g guld-sdk-cli
```

### Usage

##### CLI

```sh
guld-sdk --help

  Usage: guld-sdk [options] [command]

  Software Developer Kit for guld JS packages.

  Options:

    -V, --version           output the version number
    -u --user <name>        The user name to run as.
    -h, --help              output usage information

  Commands:

    init [options]          Create or update a JS package, including package.json, travis, webpack, and more config files.
    readme [package-name]   Guld SDK readme generator. Uses package.json, .travis.yml, and pre-existing README.md files to generate guld-style README.md files like this project's
    version [package-name]  Guld SDK semantic version manager for packages.

```

### License

MIT Copyright isysd

