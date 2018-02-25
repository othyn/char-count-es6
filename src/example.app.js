/*
 * Just an example implementation of the library
 */

import CharCount from './char-count';
// Hmm, maybe need to rename the lib file to CharCount
// to make this a little less confusing...

new CharCount({

    onFieldEmpty: (field) => {
        console.log('onFieldEmpty');
    },

    onFieldFine: (field) => {
        console.log('onFieldFine');
    },

    onFieldWarningReached: (field, count) => {
        console.log('onFieldWarningReached');
    },

    onFieldDangerReached: (field, count) => {
        console.log('onFieldDangerReached');
    },

    onFieldLimitReached: (field, count) => {
        console.log('onFieldLimitReached');
    }

});
// Setup a new instance
