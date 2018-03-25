# CharCount
[![npm version](https://img.shields.io/npm/v/char-count-es6.svg)](https://www.npmjs.com/package/char-count-es6)
[![npm downloads](https://img.shields.io/npm/dt/char-count-es6.svg)](https://www.npmjs.com/package/char-count-es6)
[![Github file size](https://img.shields.io/github/size/othyn/char-count-es6/dist/charcount.min.js.svg)](https://github.com/othyn/char-count-es6/blob/master/dist/charcount.min.js)
[![GitHub license](https://img.shields.io/github/license/othyn/char-count-es6.svg)](https://github.com/othyn/char-count-es6/blob/master/LICENSE)
[![Build Status](https://semaphoreci.com/api/v1/othyn/char-count-es6/branches/master/badge.svg)](https://semaphoreci.com/othyn/char-count-es6)

<p align="center">
  <img src="example.gif" alt="example usage"/>
</p>

A lightweight (~7KB min) ES6 library for dealing with character counts on text fields, providing events, live counters and more!

An interactive preview can be found on the [GitHub page for this project](https://othyn.github.io/char-count-es6/).

#### Brief
The concept of the library is to define a state that the field is in dependent on where the field sits within the configured thresholds. The character count thresholds are seperated into 3 key targets; Warning, Danger and Expended. Warning is for "you're getting close!", Danger is for "for real, you are running out" and Expended is for "all used up!". When the field is empty an Empty state is declared, along with a similar Fine state being applied when the field sits between an Empty and Warning state.

Based on this, events are fired to allow utilisation of that fact and a counter is placed underneath the field to display the remainder of the expended threshold to the user in realtime.

As for the name, the project was going to be called `CharCount` through and through, but due to it being too similar to an existing NPM package, it's had to take the name `char-count-es6` for under the hood stuff. The package itself will always be accessible via the `CharCount` class.

## Installation

### Via NPM
```bash
$ npm install char-count-es6 --save-dev
```

### Via download
Download the minified source from `dist` and include in your project via

```html
<script src="/path/to/charcount.min.js"></script>
```

## Usage
To begin, import the ES6 library where required
```javascript
import CharCount from 'char-count-es6';
```

To create a new `CharCount` instance, you can write something like
```javascript
let myCharCount = new CharCount({ ...options });
```
The variable will contain an array of initialised instances, stored in the `instances` property. The element also has the instance registered against it, in the `CharCount` property.

### Options
All the following is optional. When initialising the library, the following options can be provided as an object:

#### Core
```javascript
selector: [String || Object (Element)] [Defaults to 'cc-field']
```
ID, Class or Element to initialse the library against

#### Thresholds
```javascript
warningThreshold: [Number] [Defaults to 25]
```
Character count threshold for the field to enter the warning state

```javascript
dangerThreshold: [Number] [Defaults to 10]
```
Character count threshold for the field to enter the danger state

```javascript
expendedThreshold: [Number] [Defaults to 100]
```
Character count for the maximum length of the field

#### Counter DOM Classes
```javascript
counterClass: [String] [Defaults to 'cc-count']
```
Added to all counter elements
```javascript
emptyClass: [String] [Defaults to 'cc-is-empty']
```
When the counter element's field is Empty
```javascript
fineClass: [String] [Defaults to 'cc-is-fine']
```
When the counter element's field is Fine
```javascript
warningClass: [String] [Defaults to 'cc-is-warning']
```
When the counter element's field is Warning
```javascript
dangerClass: [String] [Defaults to 'cc-is-danger']
```
When the counter element's field is Danger
```javascript
expendedClass: [String] [Defaults to 'cc-is-expended']
```
When the counter element's field is Expended

#### Callbacks
A `field` and `remaining` count is always sent to the method. The `field` is the element that called the event, with `remaining` being the current remaining character count of the field away from the expended state.
```javascript
onFieldEmpty: (field, remaining) => {}
```
Fired when a fields text count is zero; not entirely sure on its continued usefulness
```javascript
onFieldFine: (field, remaining) => {}
```
Fired when a fields text remaining count is a-okay, after coming from another state
```javascript
onFieldWarning: (field, remaining) => {}
```
Fired when the desired warning threshold is reached
```javascript
onFieldDanger: (field, remaining) => {}
```
Fired when the desired danger threshold is reached
```javascript
onFieldExpended: (field, remaining) => {}
```
Fired when the remainder is all used up!

For example implementation of this, see `src/example.app.js`

## Contributing & Development <img align="right" src="https://img.shields.io/badge/%F0%9F%A4%B7-Production%20Ready%E2%80%90ish-691d78.svg" alt="Production Ready-ish"/>
If you wish to contribute, please just fork and play around! If you have any changes, just submit a PR.

### Environment
The project utilises NPM for dependency management and webpack as a build tool, with a couple of NPM scripts setup to help with development.

When you first clone the project, run `npm install` from the project directory to get the baseline all squared away.

#### NPM Scripts
```bash
$ npm run dev
```
Build the development environment files, this is `example.app.js` to the `docs` directory
```bash
$ npm run watch
```
The usual watch script to automatically build the `dev` environment
```bash
$ npm run hot
```
Runs a webpack dev server at `localhost:8080` from the `docs` directory, with hot module reloading
```bash
$ npm run prod
```
Builds the project out to the minified `charcount.min.js` in the `dist` directory

#### Project Structure
| Directory | Description |
|:---------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dist` | Stores assets for distribution |
| `docs` | Stores assets to be served up to GitHub pages and the local webpack dev server. Build ouput of `dev`, `hot` and `watch` |
| `legacy` | Stores the original jQuery library |
| `src` | Stores the source files for the project. This includes the entry point for the library itself `CharCount.js`, its `core` and its `helpers`. There are also example assets in there; `example.app.js` for implementation and `scss` (Sass) for styling |

## Todo
- Unit tests!
- Automatic build, probably on Semaphore CI
