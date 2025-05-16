## Create react app with Typescript template

```bash
npx create-react-app --use-npm --template=typescript {project-name}
```

> clear useless code & images from the init template

## Add configurations

##### Add the following content to `.gitignore` file

```plaintext
# IDE
.idea
.idea/*
*.iml
.idea/*.iml
.idea/*.xml
out
gen
*.patch
/.eslintcache
/.cert/cert.pem
/.cert/key.pem

```

##### Create `.editorconfig` file

```bash
touch .editorconfig
```

##### Add the following config to the newly created `.editorconfig` file

```plaintext
# EditorConfig helps developers define and maintain consistent
# coding styles between different editors and IDEs
# editorconfig.org

root = true

[*]
# Change these settings to your own preference
indent_style = space
indent_size = 2

# We recommend you to keep these unchanged
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = false

[*.md]
trim_trailing_whitespace = false

```

> *Please remove eslintConfig section from package.json file*

## Add prettier integration

```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

##### Created `.eslintignore` file

```bash
touch .eslintignore
```

##### Add the following config to the newly created `.eslintignore` file

```plaintext
**/*.js
node_modules
build
package-lock.json
src/react-app-env.d.ts

```

##### Create `.eslintrc.js` file

```bash
touch .eslintrc.js
```

##### Add the following content in `.eslintrc.js` file

```js
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    /* eslint */
    'eol-last': 'off',
    'no-debugger': 'off',
    /* prettier */
    'prettier/prettier': 'error',
    /* jsx-a11y */
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-autofocus': 0,
    /* react */
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    /* typescript */
    '@typescript-eslint/ban-ts-ignore': 0,
    /*'@typescript-eslint/ban-ts-comment': 'off',*/
    '@typescript-eslint/no-explicit-any': 'off',
  },
}

```

##### Create `.prettierrc.js` file

```bash
touch .prettierrc.js
```

##### Add the following content in `.prettierrc.js` file

```js
module.exports = {
  semi: false,
  useTabs: false,
  printWidth: 120,
  endOfLine: 'auto',
  singleQuote: true,
  trailingComma: 'es5',
  parser: 'typescript',
  bracketSpacing: true,
  arrowParens: 'always',
  bracketSameLine: false
}

```

##### add the following scripts to package.json file

```
    "lint": "eslint '*/**/*.{js,,jsonjsx,ts,tsx}' --quiet --fix",
    "test:lint": "eslint '*/**/*.{js,jsx,ts,tsx}' --quiet",
    "sort-package-json": "npm remove --save anything",
```

##### Add Craco & Circular dependency plugin

```bash
npm i -D @craco/craco circular-dependency-plugin -f 
```

##### Create `craco.config.js` file

```bash
touch craco.config.js
```

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const { whenDev } = require('@craco/craco')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  webpack: {
    plugins: {
      add: [
        ...whenDev(
          () => [
            new CircularDependencyPlugin({
              exclude: /node_modules/,
              include: /src/,
              failOnError: true,
              allowAsyncCycles: false,
              cwd: process.cwd(),
            }),
          ],
          []
        ),
      ],
    },
  },
}

```

##### Add HUSKY AND LINT-STAGED

Run the following commands:

```bash
npx husky-init && npm install && npx husky add .husky/pre-commit "npx lint-staged"
```

Then add the following item to package.json:

```
  "lint-staged": {
      "*.{js,jsx,ts,tsx}": [
          "eslint . --fix"
      ]
  }
```

> Click the following link if you got [Command not found Error](https://typicode.github.io/husky/#/?id=command-not-found)

##### clear lint errors

##### update npm packages

## Associate git repo & create & push master, demo, and dev branches to remote git repo

```bash
git remote add origin git@bitbucket.org:{org name}/{repo name}.git
git push -u origin master
git checkout -b dev
git push
```

## Setup Material UI v5

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @fontsource/roboto
```

> [Optional] install `npm i @mui/lab`  Then, you can import it in your entry-point.

```ts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

> [Optional] install `npm i -D eslint-plugin-mui-unused-classes`  & add the `mui-unused-classes` to eslint plugins.

#### Example

https://github.com/mui-org/material-ui/blob/master/examples/create-react-app-with-typescript/README.md

#### Docs

- https://mui.com/getting-started/installation/
- https://mui.com/components/about-the-lab/
- https://mui.com/components/icons/#main-content

#### Steps

- install material ui v5 npm packages
- add Reboto front & Material Icons references on index.css
- create theme js module
- add Mui's custom css to index.css
- build MuiContainer component with proper integration
- utilize MuiContainer in App component to complete the integration

## Install React Location

https://react-location.tanstack.com/overview

```bash
npm i react-location
npm i -D react-location-devtools
```


## Install React Query

```shell
npm i react-query
```

https://react-query.tanstack.com/installation

##### Add the following ReactQueryContainer components

```tsx
// src/components/containers/ReactQueryContainer.jsx

import { ReactElement } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientContainer } from 'react-query'

import { isProduction } from '../../helpers/common'

function ReactQueryContainer(props: { children: ReactElement | ReactElement[] }): ReactElement {
  const { children } = props

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // query options
        retry: 1,
        suspense: false,
        refetchOnWindowFocus: false,
        staleTime: 10000,
      },
      mutations: {
        // mutation options
        retry: 0,
      },
    },
  })

  return (
    <QueryClientContainer client={queryClient}>
      {children}
      {!isProduction() ? <ReactQueryDevtools initialIsOpen={false} /> : <></>}
    </QueryClientContainer>
  )
}

export default ReactQueryContainer
```

##### Wrap `<App />` children in src/App.jsx with `<ReactQueryContainer></ReactQueryContainer>`

## Run the following commands to add required npm packages

```bash
npm i lodash
npm i -D @types/lodash
```

##### Add the following common helper js module

```ts
// src/helpers/common.js

import _get from 'lodash/get'

export const stringify = JSON.stringify

export const isProduction = (): boolean => {
  return !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
}
```
