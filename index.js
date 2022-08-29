const exec = require('child_process').exec
const { ESLint } = require('eslint')

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
    const eslint = new ESLint(opts)

    // 2. Lint files.
    let arr = stdout.replace(/\n/g, '').split(' ')
    arr = arr.filter(f => f.includes('.'))

    if (arr.length) {
      console.log('Dirty files:')
      arr.forEach(f => { console.log(`  - ${f}`) })
    } else {
      console.log('No dirty files')
      return
    }

    const results = await eslint.lintFiles(arr)

    if (opts.fix) {
      await ESLint.outputFixes(results)
    }

    // 3. Format the results.
    const formatter = await eslint.loadFormatter('stylish')
    const resultText = formatter.format(results)

    // 4. Output it.
    console.log(resultText)
  })
}

module.exports = {
  lintDirty
}
