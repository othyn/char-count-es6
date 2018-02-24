import CharCount from './char-count';
// Hmm, maybe need to rename the lib file to CharCount
// to make this a little less confusing...

new CharCount({

    onFieldEmpty: (field) => {
        console.log('onFieldEmpty');
    },

    onFieldWarningReached: (field, count) => {
        console.log('onFieldWarningReached');
    },

    onFieldWarningWithdrawn: (field, count) => {
        console.log('onFieldWarningWithdrawn');
    },

    onFieldDangerReached: (field, count) => {
        console.log('onFieldDangerReached');
    },

    onFieldDangerWithdrawn: (field, count) => {
        console.log('onFieldDangerWithdrawn');
    },

    onFieldLimitReached: (field, count) => {
        console.log('onFieldLimitReached');
    },

    onFieldLimitWithdrawn: (field, count) => {
        console.log('onFieldLimitWithdrawn');
    },

});
// Setup a new instance
