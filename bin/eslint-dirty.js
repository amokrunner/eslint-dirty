#!/usr/bin/env node
'use strict'

const { lintDirty } = require('../index')
const opts = {
  fix: process.argv.includes('--fix')
}
if (process.argv.includes('--commit')) {
  const i = process.argv.findIndex(a => a === '--commit')
  opts.commit = process.argv[i + 1]
}
lintDirty(opts)
