# small-forge

[![version](https://img.shields.io/npm/v/small-forge.svg?style=flat-square)](http://npm.im/small-forge)
[![downloads](https://img.shields.io/npm/dm/small-forge.svg?style=flat-square)](http://npm-stat.com/charts.html?package=small-forge&from=2020-05-01)

A small npm package to generate HTML easily.

## Installing

```shell
npm i small-forge
```

## Design goals

* the fewest/smallest dependencies possible (I am one of those people who hate having a lot of small libs to use another bigger lib)
* simplicity
* use and abuse of `...args`
* documentation everywhere

## Examples

```js
const sf = require('small-forge');
const [div, h1, p, img] = sf.forgeSomeElements(
    'div', { className: 'cool-div' },
    'h1',  { textContent: 'Hello GitHub!' },
    'p',   { className: 'big-paragraph', textContent: 'A small package to generate HTML easily' },
    'img', { src: 'public/img/sf.png', alt: 'small-forge logo' }
);

sf.forgeStyle(div, {
    opacity: 1.0,
    transition: 'opacity 1s'
});

sf.forgeHierarchy(
    div, [
        h1, p, img
    ]
);
```