# CharCount
A lightweight (~7KB min) ES6 library for dealing with character counts on text fields, providing events, live counters and more!

An interactive preview can be found on the [GitHub page for this project]().

The concept of the library is to define a state that the field is in dependent on where the field sits within the configured thresholds. The character count thresholds are seperated into 3 key targets; Warning, Danger and Expended. Warning is for "you're getting close!", Danger is for "for real, you are running out" and Expended is for "all used up!". When the field is empty an Empty state is declared, along with a similar Fine state being applied when the field sits between an Empty and Warning state.
Based on this, events are fired to allow utilisation of that fact and a counter is placed underneath the field to display the remainder of the expended threshold to the user in realtime.

## Installation

### Via NPM
`$ npm install char-count --save-dev`

### Via download
Download the minified source from `dist` and include in your project via

`<script src="/path/to/charcount.min.js"></script>`

## Usage
To begin, import the ES6 library where required `import CharCount from 'CharCount';`

To create a new instance, you can define a new `CharCount`, e.g. `let myCharCount = new CharCount( <options> );`. The variable will contain an array of initialised instances, stored in the `instances` property. The element also has the instance registered against it, in the `CharCount` property.

### Options
All the following is optional. When initialising the library, the following options can be provided as an object:

#### Core
- `selector: [String || Object (Element)] [Default 'cc-field']` - ID, Class or Element to initialse the library against

#### Thresholds
- `warningThreshold: [Int] [Default 25]` - Character count threshold for the field to enter the warning state
- `dangerThreshold: [Int] [Default 10]` - Character count threshold for the field to enter the danger state
- `expendedThreshold: [Int] [Default 100]` - Character count for the maximum length of the field

#### Counter DOM Classes
- `counterClass: [String] [Default 'cc-count']` - Added to all counter elements
- `emptyClass: [String] [Default 'cc-is-empty']` - When the counter element's field is Empty
- `fineClass: [String] [Default 'cc-is-fine']` - When the counter element's field is Fine
- `warningClass: [String] [Default 'cc-is-warning']` - When the counter element's field is Warning
- `dangerClass: [String] [Default 'cc-is-danger']` - When the counter element's field is Danger
- `expendedClass: [String] [Default 'cc-is-expended']` - When the counter element's field is Expended

#### Callbacks
A `field` and `remaining` count is always sent to the method. The `field` is the element that called the event, with `remaining` being the current remaining character count of the field away from the expended state.
- `onFieldEmpty: (field, remaining) => {}` - Fired when a fields text count is zero; not entirely sure on its continued usefulness
- `onFieldFine: (field, remaining) => {}` - Fired when a fields text remaining count is a-okay, after coming from another state
- `onFieldWarning: (field, remaining) => {}` - Fired when the desired warning threshold is reached
- `onFieldDanger: (field, remaining) => {}` - Fired when the desired danger threshold is reached
- `onFieldExpended: (field, remaining) => {}` - Fired when the remainder is all used up!

For example implementation of this, see `src/example.app.js`

## Contributing
If you wish to contribute, please just fork and play around! If you have any changes, just submit a PR.

## Todo
- Unit tests!
