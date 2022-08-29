var exec = require('child_process').exec
const { ESLint } = require('eslint')

console.log('ok')
var result = function(command, cb){
  exec(command, function(err, stdout, stderr){
    if(err != null){
      return cb(new Error(err), null)
    }else if(typeof(stderr) != 'string'){
      return cb(new Error(stderr), null)
    }else{
      return cb(null, stdout)
    }
  })
}


console.log(process.argv[2])

result('git diff --name-only HEAD | xargs', async (res, stdout, stderr )=>{
  console.log(stdout)
   
  let opts = {}
  if (process.argv[2] === 'fix') opts.fix = true
  const eslint = new ESLint(opts)

  // 2. Lint files.
  let arr = stdout.replace(/\n/g,'').split(' ')
  
  
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
  
