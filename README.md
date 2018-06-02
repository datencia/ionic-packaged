# Packaging Ionic libraries with ng-packagr

This repository is an example of how to set-up an [Ionic](https://ionicframework.com/)
project to contain and build libraries that meets the Angular Package Format specification.

It features the `@my/lib` library package. `@my/lib` is packaged with
[ng-packagr](https://github.com/dherges/ng-packagr) and then imported into the Ionic app.

The Ionic app will act as a sandbox where we could test out our components before
we package them.


## Summary

1. How this repo was created
2. Creating your first library
3. Building your library


## How this repo was created

First things first. All credits belong to [dherges](https://github.com/dherges) and his
[ng-packaged](https://github.com/dherges/ng-packaged) sample. I've only adapted it to
[Ionic](https://ionicframework.com/).

So, let's go...

### Create an empty Ionic project

```bash
$ ionic start ionic-packaged blank
```

### Install the `ng-packagr` library as dev dependency

```bash
$ npm install --save-dev ng-packagr
```

Install also `rimraf` (We will use it to delete the build output folder before building the library)

```bash
$ npm install --save-dev rimraf
```

### Create the library folder

Create a folder called `libs` at the project root level with the next structure:

```
libs
├── .browserslistrc
├── package.json
└── src
    ├── lib.module.ts
    └── public_api.ts
```

This is enough for now. later on we will define the content of each file.

### Add Build Script

In root `package.json` add the build script for your libraries:

```json
{
  "scripts": {
    "build:lib": "rimraf dist && ng-packagr -p libs/package.json",
  }
}
```

> As you may have guessed, the build output folder is `dist`.

### Configure the Ionic app to act as a Sandbox

In order to use the Ionic app as a sandbox we need to apply some changes to
the default Ionic config.

Modify your `tsconfig.json` and map the typescript import path for your library.
It should looks like this:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "allowSyntheticDefaultImports": true,
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "dom",
      "es2015"
    ],
    "paths": {
      "@my/lib": [ "dist/libs" ]
    },
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,
    "target": "es5"
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    ".ng_build",
    "node_modules",
    "src/**/*.spec.ts",
    "src/**/__tests__/*.ts"
  ],
  "compileOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
}
```

Now, we need to override the Ionic Webpack config.

Create a new folder called `config` at the root level of your Ionic project.
Then add a `webpack.config.js` file with the next content.

```javascript
const { join } = require('path');
const webpackMerge = require('webpack-merge');
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config');

const customConfig = {
  resolve: {
    alias: {
      "@my/lib": join(__dirname, '../dist/libs'),
    }
  }
};

module.exports = {
  dev: webpackMerge(dev, customConfig),
  prod: webpackMerge(prod, customConfig),
};
```

> Note we are requering `webpack-merge` to apply the changes to webpack. So you'll need
to install it as a dev dependency.

```bash
$ npm install --save-dev webpack-merge
```

And the last step, tell Ionic to use the new webpack config. In root `package.json` add the next config:

```json
{
  "config": {
    "ionic_webpack": "./config/webpack.config.js"
  },
```

### Create the library folder

It's time to back to the `libs` folder to add content to every file in.

```
libs
├── .browserslistrc
├── package.json
└── src
    ├── lib.module.ts
    └── public_api.ts
```

- `package.json`

```json
{
    "name": "@my/lib",
    "version": "1.0.0-alpha.0",
    "repository": "https://github.com/datencia/ionic-packaged.git",
    "author": "David Atencia <david.atencia@gmail.com>",
    "license": "MIT",
    "private": true,
    "peerDependencies": {
      "@angular/core": ">=5.2.10",
      "@angular/common": ">=5.2.10",
      "ionic-angular": "3.9.2"
    },
    "ngPackage": {
      "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
      "lib": {
        "entryFile": "src/public_api.ts"
      },
      "dest": "../dist/libs"
    }
  }

```

- `lib.module.ts`

```typescript
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        // The component, directive and pipe classes that belong to this module.
    ],
    exports: [
        // A list of declarations — component, directive, and pipe classes — that an importing module can use.
    ]
})
export class MyLibModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MyLibModule,
            providers: [
                // A list of dependency injection providers.
            ]
        };
    }
}
```

- `.browserslistrc`

```
last 2 Chrome versions
iOS > 10
Safari > 10
```

> [browserslist](https://github.com/ai/browserslist) determines which browser versions should be supported.

- `public_api.ts`

This file is the entry point to your library.

It should export all your components, services, pipes, etc.

> Right now you can leave it empty


## Creating your first library

Now you are ready to start coding your library.

TODO


## Building your library

To build your library just run:

```bash
$ npm run build:lib
```

The build output is written to the dist folder, containing all those binaries
to meet the Angular Package Format specification. 
