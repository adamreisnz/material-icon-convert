# Material icon converter

[![npm version](https://img.shields.io/npm/v/material-icon-convert.svg)](https://www.npmjs.com/package/material-icon-convert)
[![node dependencies](https://david-dm.org/adamreisnz/material-icon-convert.svg)](https://david-dm.org/adamreisnz/material-icon-convert)
[![build status](https://travis-ci.org/adamreisnz/material-icon-convert.svg?branch=master)](https://travis-ci.org/adamreisnz/material-icon-convert)
[![coverage status](https://coveralls.io/repos/github/adamreisnz/material-icon-convert/badge.svg?branch=master)](https://coveralls.io/github/adamreisnz/material-icon-convert?branch=master)
[![github issues](https://img.shields.io/github/issues/adamreisnz/material-icon-convert.svg)](https://github.com/adamreisnz/material-icon-convert/issues)

A simple utility to quickly replace ligature format [Material Design icons](https://material.io/icons/) to their unicode characters. This allows you to develop using the legible ligature format yet deploy your code using unicode characters for support in ~~crappy browsers~~ Edge.

## Installation
```shell
# Using npm
npm install material-icon-convert

# Using yarn
yarn add material-icon-convert
```

## Basic usage

```js
//Load the library and specify options
const convert = require('material-icon-convert');
const options = {
  files: 'path/to/files/**/*.html',
  className: 'material-icons',
  inverse: false, //Specify true to convert from character code to ligatures
};
```

### Asynchronous replacement with promises

```js
convert(options)
  .then(changes => {
    console.log('Modified files:', changes.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
```

### Asynchronous replacement with callback

```js
convert(options, (error, changes) => {
  if (error) {
    return console.error('Error occurred:', error);
  }
  console.log('Modified files:', changes.join(', '));
});
```

### Synchronous replacement

```js
try {
  const changes = convert.sync(options);
  console.log('Modified files:', changes.join(', '));
}
catch (error) {
  console.error('Error occurred:', error);
}
```

### Return value

The return value of the library is an array of file names of files that were modified (e.g.
had some of the contents replaced). If no replacements were made, the return array will be empty.

```js
const changes = convert.sync({
  files: 'path/to/files/**/*.html',
  className: 'material-design',
});

console.log(changes);

// [
//   'path/to/files/file1.html',
//   'path/to/files/file3.html',
//   'path/to/files/file5.html',
// ]
```

### Advanced usage
This library uses [replace-in-file](https://www.npmjs.com/package/replace-in-file) under the hood to make the replacements, so check out that package for more advanced usage options.

## License
(MIT License)

Copyright 2015-2017, [Adam Reis](https://adam.reis.nz)
