#!/usr/bin/env node
const program = require('commander')
const thispkg = require(`${__dirname}/package.json`)
const { getFS } = require('guld-fs')
const { getName } = require('guld-user')
const guldSDK = require('guld-sdk')
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
    if (options.name) process.chdir(guldSDK.getPath(options.name))
    else options.name = process.cwd().replace(guldSDK.getPath(''), '').replace('/', '')
    if (options.name === '') {
      console.log(`Invalid package-name ${options.name}`)
      process.exit(1)
    }
    fs = fs || await getFS()
    var guser = await getName()
    await guldSDK.init(guser, options.name)
    console.log(`Initialized ${options.name}`)
  })

program
  .command('readme [package-name]')
  .description("Guld SDK readme generator. Uses package.json, .travis.yml, and pre-existing README.md files to generate guld-style README.md files like this project's")
  .action(async (pname, options) => {
    if (pname) process.chdir(guldSDK.getPath(pname))
    else pname = process.cwd().replace(guldSDK.getPath(''), '').replace('/', '')
    if (pname === '') {
      console.log(`Invalid package-name ${pname}`)
      process.exit(1)
    }
    fs = fs || await getFS()
    var pkg = await guldSDK.readThenClose('package.json', 'json')
    await fs.writeFile('README.md', await guldSDK.genReadme(pkg))
    console.log(`Created README.md for ${pname}`)
  })

program
  .command('version [package-name]')
  .description("Guld SDK semantic version manager for packages.")
  .action(async (pname, options) => {
    if (pname) process.chdir(guldSDK.getPath(pname))
    else pname = process.cwd().replace(guldSDK.getPath(''), '').replace('/', '')
    if (pname === '') {
      console.log(`Invalid package-name ${pname}`)
      process.exit(1)
    }
    fs = fs || await getFS()
    var guser = await getName()
    var pkg = await guldSDK.readThenClose('package.json', 'json')
    await fs.writeFile('README.md', await guldSDK.version(guser, pkg.name, ))
    console.log(`Created README.md for ${pname}`)
  })

/* eslint-enable no-console */

if (process.argv.length === 2) {
  program.help()
} else if (process.argv.length > 2) {
  program.parse(process.argv)
}
module.exports = program
