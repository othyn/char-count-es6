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

    onFieldWarning: (field, count) => {
        console.log('onFieldWarning');
    },

    onFieldDanger: (field, count) => {
        console.log('onFieldDanger');
    },

    onFieldLimit: (field, count) => {
        console.log('onFieldLimit');
    }

});
// Setup a new instance
