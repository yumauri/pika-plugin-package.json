# pika-plugin-package.json

[![Build Status](https://github.com/yumauri/pika-plugin-package.json/workflows/build/badge.svg)](https://github.com/yumauri/pika-plugin-package.json/actions?workflow=build)
[![Coverage Status](https://coveralls.io/repos/github/yumauri/pika-plugin-package.json/badge.svg?branch=master)](https://coveralls.io/github/yumauri/pika-plugin-package.json?branch=master)
[![License](https://img.shields.io/github/license/yumauri/pika-plugin-package.json.svg?color=yellow)](./LICENSE)

[@pika/pack](https://github.com/pikapkg/pack) build plugin to modify package.json file.

## Install

```bash
$ yarn add pika-plugin-package.json
```

Or using `npm`

```bash
$ npm install --save pika-plugin-package.json
```

## Usage

```json
{
  "name": "example-package-json",
  "version": "1.0.0",
  "@pika/pack": {
    "pipeline": [
      // ---8<---
      [
        "pika-plugin-package.json",
        {
          "+dependencies": {
            "lodash": "^"
          },
          "*keywords": ["+example"],
          "*files": ["-bin/"],
          "+author": "^",
          "-devDependencies": {}
        }
      ]
    ]
  }
}
```

## Options

Pass any object, and it will be merged to result `pkg/package.json`<br>
There are three modifiers, which you can add to properties / array items:

- **`-`**: remove this property / item
- **`*`**: merge this property (if there is no such property - it will be added)
- **`+`**: add this property / item (if already exists - it will be _replaced_)

By default (without modifier) - _merge_ (**`*`**) is applied. But I recomment always define modifiers for more expressness and clarity.

If you want, for some reason, _add_ property named `*prop` (for example) — you can escape modifier like this - `\\*prop` - or just explicitly define needed modifier - `+*prop` - as I recommended before.

### For example

`"+license": "MIT"`<br>
will add (or _replace_) `license` field.

`"-devDependencies": {}`<br>
will remove `devDependencies` (value is not really matters here).

`"*dependencies": { "lodash": "^4.17.15" }`<br>
will _add_ lodash dependency to existing dependencies (or will create `dependencies` with lodash, if there were no any dependencies).

`"*files": ["-bin/"]`<br>
will _remove_ `bin/` item from `files` property.

## Inheritance

You can specify special value `^` to any property, and value will be populated from original package.json. For example:

`"+author": "^"`<br>
will add `author` field with value from original package.json (if defined).

This should work on any deep level, but only with object properties (no arrays).
