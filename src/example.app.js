/*
 * Just an example implementation of the library
 */

import CharCount from './CharCount';
// Import library

window.charCountInstance = new CharCount({ // eslint-disable-line no-unused-vars

    onFieldEmpty: (field, count) => {

        console.log('onFieldEmpty');

        field.className = 'form-control cc-field';
        // Reset Bootstrap form state
    },

    onFieldFine: (field, count) => {

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

    onFieldExpended: (field, count) => {

        console.log('onFieldExpended');

        field.className = 'form-control cc-field is-invalid';
        // Set field to Bootstrap danger state
    }

});
// Setup a new instance
