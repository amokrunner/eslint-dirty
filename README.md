# eslint-dirty
Eslint on only dirty files (relative to git HEAD)


### With Install:
```
npm install eslint-dirty --save-dev
```
In your package.json file, add a script:
```
  "scripts": {
    "lintdirty": "eslint-dirty"
  }
```
From the command line:
```
npm run lintdirty
npm run lintdirty -- --fix
npm run lintdirty -- --commit <commit_or_branch>
npm run lintdirty -- --fix --commit <commit_or_branch>
```

### Without Install:
From command line, to show lint results:
```
npx eslint-dirty
npx eslint-dirty --fix
npx eslint-dirty --commit <commit_or_branch>
npx eslint-dirty --fix --commit <commit_or_branch>
```

