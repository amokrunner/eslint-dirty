# eslint-dirty
Eslint on only dirty files (relative to git HEAD)


### With Install:
```
npm install eslint-dirty --save-dev
```
In your package.json file, add a script:
```
  "scripts": {
    "lintdirty": "eslint-dirty",
    "lintdirtyfix": "eslint-dirty --fix",
  }
```
From the command line:
```
npm run lintdirty
npm run lintdirtyfix
```


### Without Install:
From command line, to show lint results:
```
npx eslint-dirty
```

From command line, to show lint results AND fix them:
```
npx eslint-dirty --fix
```

