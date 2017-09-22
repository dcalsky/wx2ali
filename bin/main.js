#!/usr/bin/env node
const CONFIG_GROUP = "Config options:"
const BASIC_GROUP = "Basic options:"
const App = require('../dist/Main').default
const path = require('path')

const yargs = require('yargs')
  .usage('$0 <cmd> [args]')
  .help()
  .alias('help', 'h')
  .alias('version', 'v')
  .options({
    config: {
      type: 'string',
      describe: 'Path to the config file',
      default: 'wx2ali.config.js',
      group: CONFIG_GROUP,
      defaultDescription: "wx2ali.config.js",
      requiresArg: true
    },
    context: {
      type: "string",
      describe: "The root directory for resolving entry point and stats",
      group: BASIC_GROUP,
      defaultDescription: "The current directory",
      requiresArg: true
    }
  })

function transform_abs(config_path, relative_path) {
  return path.isAbsolute(relative_path) ? relative_path :  path.resolve(path.dirname(config_path), relative_path)
}

yargs.parse(process.argv.slice(2), (err, argv) => {
  const config_path = path.resolve(argv.config)
  const options = require(config_path)
  options.entry = transform_abs(config_path, options.entry)
  options.output = transform_abs(config_path, options.output)
  console.log(options)
  new App(options)
})
