#!/usr/bin/env node
const program = require('commander')
const thispkg = require(`${__dirname}/package.json`)
const { getFS } = require('guld-fs')
const { getName } = require('guld-user')
const guldSDK = require('guld-sdk')
const runCLI = require('guld-cli-run')
var fs

/* eslint-disable no-console */
program
  .name(thispkg.name.replace('-cli', ''))
  .version(thispkg.version)
  .description(thispkg.description)
  .option('-u --user <name>', 'The user name to run as.', (n) => {
    if (n) process.env.GULDNAME = global.GULDNAME = n
    return true
  })
program
  .command('init')
  .description('Create or update a JS package, including package.json, travis, webpack, and more config files.')
  .option('-n --name <package-name>', 'The package name to operate on.')
  .action(async (options) => {
    fs = fs || await getFS()
    var pkg = typeof options.name === 'string' ? await guldSDK.gogetpkg({ name: options.name }) : await guldSDK.gogetpkg()
    if (typeof pkg.name !== 'string' || pkg.name.length === 0) {
      console.log(`Invalid package-name ${pkg.name}`)
      process.exit(1)
    }
    fs = fs || await getFS()
    var guser = await getName()
    await guldSDK.init(guser, pkg)
    console.log(`Initialized ${pkg.name}`)
  })

program
  .command('readme')
  .description("Readme generator. Uses package.json, .travis.yml, and pre-existing README.md files to generate guld-style README.md files like this project's")
  .option('-n --name <package-name>', 'The package name to operate on.')
  .action(async (options) => {
    var pkg = typeof options.name === 'string' ? await guldSDK.gogetpkg({ name: options.name }) : await guldSDK.gogetpkg()
    if (typeof pkg.name !== 'string' || pkg.name.length === 0) {
      console.log(`Invalid package-name ${pkg.name}`)
      process.exit(1)
    }
    fs = fs || await getFS()
    await fs.writeFile('README.md', await guldSDK.genReadme(pkg))
    console.log(`Created README.md for ${pkg.name}`)
  })

program
  .command('version [vtype]')
  .description('Semantic version manager for packages.')
  .option('-n --name <package-name>', 'The package name to operate on.')
  .action(async (vtype, options) => {
    fs = fs || await getFS()
    var pkg = typeof options.name === 'string' ? await guldSDK.gogetpkg({ name: options.name }) : await guldSDK.gogetpkg()
    if (typeof pkg.name !== 'string' || pkg.name.length === 0) {
      console.log(`Invalid package-name ${pkg.name}`)
      process.exit(1)
    }
    var guser = await getName()
    await guldSDK.version(guser, pkg, vtype)
    var ver = (await guldSDK.readThenClose(`${guldSDK.getPath(pkg.name)}/package.json`, 'json')).version
    console.log(`Updated version for ${pkg.name} to ${ver}.`)
  })

program
  .command('publish')
  .description('Publish a package to both npm and the blocktree.')
  .option('-n --name <package-name>', 'The package name to operate on.')
  .action(async (options) => {
    var pkg = typeof options.name === 'string' ? await guldSDK.gogetpkg({ name: options.name }) : await guldSDK.gogetpkg()
    if (pkg.name === '') {
      console.log(`Invalid package-name ${pkg.name}`)
      process.exit(1)
    }
    fs = fs || await getFS()
    var guser = await getName()
    await guldSDK.publish(guser, pkg)
    console.log(`Published ${pkg.name} at ${pkg.version}.`)
  })

program
  .command('upgrade')
  .description('Upgrade dependencies for a package.')
  .option('-n --name <package-name>', 'The package name to operate on.')
  .action(async (options) => {
    var pkg = typeof options.name === 'string' ? await guldSDK.gogetpkg({ name: options.name }) : await guldSDK.gogetpkg()
    if (typeof pkg.name !== 'string' || pkg.name.length === 0) {
      console.log(`Invalid package-name ${pkg.name}`)
      process.exit(1)
    }
    await guldSDK.upgrade({ name: pkg.name })
    console.log(`Updated dependencies for ${pkg.name}.`)
  })

/* eslint-enable no-console */
runCLI.bind(program)()
module.exports = program
