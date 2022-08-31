const exec = require('child_process').exec
const { ESLint } = require('eslint')
const fs = require('fs')

const result = function (command, cb) {
  exec(command, function (err, stdout, stderr) {
    if (err != null) {
      return cb(new Error(err), null)
    } else if (typeof (stderr) !== 'string') {
      return cb(new Error(stderr), null)
    } else {
      return cb(null, stdout)
    }
  })
}

function lintDirty (opts = {}) {
  console.log(`Running eslint-dirty${Object.keys(opts).length ? ' with options:' : '.'}`)
  Object.keys(opts).forEach(k => { console.log(`  - ${k}: ${opts[k]}`) })
  result('git diff --name-only HEAD | xargs', async (res, stdout, stderr) => {
    // turn git diff output into array:
    let arr = stdout.replace(/\n/g, '').split(' ')

    // filter for valid files:
    arr = arr.filter(f =>
      f.includes('.') && // has an extension:
      !f.includes('.json') && // is not json
      fs.existsSync(f) // exists
    )

    // report files:
    if (arr.length) {
      console.log('Dirty files:')
      arr.forEach(f => { console.log(`  - ${f}`) })
    } else {
      console.log('No dirty files')
      return
    }

    // run eslint:
    const eslint = new ESLint(opts)
    const results = await eslint.lintFiles(arr)

    // fix, if fixing:
    if (opts.fix) {
      await ESLint.outputFixes(results)
    }

    // Format the results:
    const formatter = await eslint.loadFormatter('stylish')
    const resultText = formatter.format(results)

    // Output results
    console.log(resultText)
  })
}

module.exports = {
  lintDirty
}
