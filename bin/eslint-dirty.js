#!/usr/bin/env node
'use strict'

const { lintDirty } = require('../index')
lintDirty({
  fix: process.argv.includes('--fix')
})
