/*
 * Just an example implementation of the library
 */

import CharCount from './char-count';
// Hmm, maybe need to rename the lib file to CharCount
// to make this a little less confusing...

new CharCount({

    onFieldEmpty: (field) => {

        console.log('onFieldEmpty');

        field.className = 'form-control cc-field';
        // Reset Bootstrap form state
    },

    onFieldFine: (field) => {

        console.log('onFieldFine');

        field.className = 'form-control cc-field is-valid';
        // Reset Bootstrap form state
    },

    onFieldWarning: (field, count) => {

        console.log('onFieldWarning');

        field.className = 'form-control cc-field';
        // Set field to Bootstrap warning state
    },

    onFieldDanger: (field, count) => {

        console.log('onFieldDanger');

        field.className = 'form-control cc-field is-invalid';
        // Set field to Bootstrap danger state
    },

    onFieldLimit: (field, count) => {

        console.log('onFieldLimit');

        field.className = 'form-control cc-field is-invalid';
        // Set field to Bootstrap danger state
    }

});
// Setup a new instance
