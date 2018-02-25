import State from './helpers/State';

/**
 * Counts characters, so you don't have to!
 */
export default class CharCount {

    /**
     * constructor
     * @param  object   Config to initialise the class with
     * @return void
     */
    constructor({

        limit = 100,
        warning = 25,
        danger = 10,
        // Threshold values

        classInitField = 'cc-field',
        classCounter = 'cc-count',
        // DOM interaction classes

        classStateIsFine = 'cc-is-fine',
        classStateIsWarning = 'cc-is-warning',
        classStateIsDanger = 'cc-is-danger',
        classStateIsLimit = 'cc-is-limit',
        // DOM state classes

        // Callbacks
        // Spent well over an hour trying to research good practice for this
        // behaviour in ES6/etc. as it was fairly common in jQuery for options
        // but I don't know whether to repeat this behaviour. At the moment,
        // its the only way I can think of implementing the required functionality.
        // Would like to find some libraries as reference to see how this has been
        // done by other devs, or I am welcome to discuss other methods of implementation
        // for this if another method is more efficient/best practice.

        onFieldEmpty = (field) => {},
        // Fired when a fields text count is zero; not entirely sure on its continued usefulness

        onFieldWarningReached = (field, count) => {},
        // Fired when the warning character count threshold is reached

        onFieldWarningWithdrawn = (field, count) => {},
        // Fired after the character count returns to below that of the warning threshold

        onFieldDangerReached = (field, count) => {},
        // Fired when the danger character count threshold is reached

        onFieldDangerWithdrawn = (field, count) => {},
        // Fired after the character count returns to below that of the warning threshold

        onFieldLimitReached = (field, count) => {},
        // Fired when the limit character count threshold is reached

        onFieldLimitWithdrawn = (field, count) => {}
        // Fired after the character count returns to below that of the limit threshold

    } = {}) {

        this.states = {
            fine: new State(limit, classStateIsFine),
            warning: new State(warning, classStateIsWarning),
            danger: new State(danger, classStateIsDanger),
            limit: new State(0, classStateIsLimit)
        };
        // Define states

        this.classInitField = classInitField;
        this.classCounter = classCounter;
        // Setup DOM interaction classes

        this.onFieldEmpty = onFieldEmpty;
        this.onFieldWarningReached = onFieldWarningReached;
        this.onFieldWarningWithdrawn = onFieldWarningWithdrawn;
        this.onFieldDangerReached = onFieldDangerReached;
        this.onFieldDangerWithdrawn = onFieldDangerWithdrawn;
        this.onFieldLimitReached = onFieldLimitReached;
        this.onFieldLimitWithdrawn = onFieldLimitWithdrawn;
        // Register callbacks

        this.bindFields();
        // Bind the class to the defined DOM interaction classes
    }

    /**
     * Binds listener events to the fields with the configured class
     * @return void
     */
    bindFields() {

        let elements = document.getElementsByClassName(this.classInitField);
        // Pull all DOM elements to initialise into an HTMLCollection

        if (Object.keys(elements).length === 0)
            return console.warn('CharCount: No elements initialised');
        // Check for elements on DOM

        Array.from(elements, el => {

            el.addEventListener('input', this.handleInputEvent.bind(this));
            // Register the event listener to the DOM elements required
            // TODO - May need to add multiple event listeners, see how it goes
            // https://stackoverflow.com/questions/8796988/binding-multiple-events-to-a-listener-without-jquery#comment49312823_27029689

            this.calculateRemainingCharacters(el);
            // Calculate initial counts for each element
        });

    }

    /**
     * Initial handler of the event, mainly to pass the element object on to calculateRemainingCharacters
     * @param  object   event   JS event
     * @return void
     */
    handleInputEvent(event) {

        this.calculateRemainingCharacters(event.target);
        // Hand off event element to calculate the remaining characters
    }

    /**
     * Determine the field state, with the intention to fire events/manage state classes
     * @param  object   field   JS element object
     * @return state
     */
    determineFieldState(field) {

        return this.states.fine;
    }

    /**
     * Calculates remaining characters but will also need to fire callbacks
     * @param  object   field   JS element object
     * @return void
     */
    calculateRemainingCharacters(field) {

        let limit = (field.hasAttribute('maxlength') ? parseInt(field.getAttribute('maxlength')) : this.states.fine.getThreshold());
        // If there is a max length applied to the field, use that instead
        // TODO - Allow for toggling this behaviour via config

        field.cc_remaining_characters = (limit - field.value.length);
        // Perform count on the field against the limit

        let activeState = this.determineFieldState(field);
        // Get the active state determined by the result of the calculation

        let potentialFieldCounter = field.nextElementSibling;
        // Get the next element to check for counters existence
        // TODO - Allow for elements that aren't situated directly below field

        if (potentialFieldCounter === null || !potentialFieldCounter.matches(`.${this.classCounter}`)) {

            this.createFieldCounter(field, activeState);
            // Create field counter if there isn't one on the DOM

        } else {

            this.updateFieldCounter(field, potentialFieldCounter, activeState);
            // Update the existing DOM field counter
        }
    }

    /**
     * Generate the markup to be placed under the field, allow templating?
     * @param  object   field         JS element object
     * @param  object   activeState   Active State
     * @return void
     */
    createFieldCounter(field, activeState) {

        let activeColourClass = activeState.getColourClass();
        // Go get the active colour class

        let counterMarkup = `<small class="${this.classCounter} ${activeColourClass}">${field.cc_remaining_characters}</small>`;
        // Generate counter markup
        // TODO - Allow this to be templated?

        field.insertAdjacentHTML('afterend', counterMarkup);
        // Insert the counter after the field in question
    }

    /**
     * Update internal character count for the fields counter
     * @param  object   field          JS element object
     * @param  object   fieldCounter   JS element object
     * @param  object   activeState    Active State
     * @return void
     */
    updateFieldCounter(field, fieldCounter, activeState) {

        let activeColourClass = activeState.getColourClass();
        // Go get the active colour class

        fieldCounter.textContent = field.cc_remaining_characters;
        // Update remaining characters

        fieldCounter.className = `${this.classCounter} ${activeColourClass}`;
        // Set active class
    }
}
