/**
 * Class that counts characters, so you don't have to!
 */
export default class CharCount {

    /**
     * constructor
     * @param  object Config to initialise the class with
     * @return void
     */
    constructor({

        limit = 100,
        warning = 25,
        danger = 10,

        fieldClass = 'cc-field',
        countClass = 'cc-count',

        goneOver = false

    } = {}) {

        // Check field maxlength attr alongside limit
        // This allows for use cases where the dev may not want to imply a hard cap to the field

        this.limit = limit;
        this.warning = warning;
        this.danger = danger;

        this.fieldClass = fieldClass;
        this.countClass = countClass;

        this.goneOver = goneOver;

        // this.bindFields()
    }


    // Getters/setters

    // set<Property>(<?>) {}
    // get<Property>(<?>) {}
    // Create setters and getters for all properties to use alongside constructor?

    // setTheme({default = '#000', warning = '#F00', danger = '#FA0'} = {}) {}
    // OR setColours({default = '#000', warning = '#F00', danger = '#FA0'} = {}) {}
    // Put colouring options in the constructor and/or as getters/setters?


    // Core functionality

    // bindFields() {}
    // Binds listener events to the fields, needs to fire initial count for bound fields?
    // Initialise an instance of the class for each field OR
    // OR follow a singleton pattern and have an internal store for instantiated fields and their state?
    // OR does that even matter as the event listener itself can return the bound field as part of the event firing?

    // calculateRemainingCharacters(field) {}
    // Calculates remaining characters but will also need to fire callbacks

    // createFieldCounter(field) {}
    // Generate the markup to be placed under the field, allow templating?

    // updateFieldCounter(field) {}
    // Update internal character count for the field


    // Events / Callbacks
    // Not sure what to call these. Spent well over an hour trying to research good
    // practice for this behaviour in ES6/etc. as it was common in jQuery but I don't
    // know whether to repeat this behaviour. At the moment, its the only way I can
    // think of implementing the required functionality. Would like to find some
    // libraries as reference to see how this has been done by other devs.
    //
    // Naming needs consideration on the withdrawn events, don't like onField<Threshold>Withdrawn

    // onFieldEmpty(callback = (field) => {}) {}
    // Fired when a fields text count is zero; not entirely sure on its continued usefulness

    // onFieldWarningReached(callback = (field, count) => {}) {}
    // Fired when the warning character count threshold is reached

    // onFieldWarningWithdrawn(callback = (field, count) => {}) {}
    // Fired after the character count returns to below that of the warning threshold

    // onFieldDangerReached(callback = (field, count) => {}) {}
    // Fired when the danger character count threshold is reached

    // onFieldDangerWithdrawn(callback = (field, count) => {}) {}
    // Fired after the character count returns to below that of the warning threshold

    // onFieldLimitReached(callback = (field, count) => {}) {}
    // Fired when the limit character count threshold is reached

    // onFieldLimitWithdrawn(callback = (field, count) => {}) {}
    // Fired after the character count returns to below that of the limit threshold
}
