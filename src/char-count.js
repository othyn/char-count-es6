import State from './helpers/State';

/**
 * Counts characters, so you don't have to!
 *
 * TODO - Currently Singleton, this would greatly benefit from an instance per element
 */
export default class CharCount {

    /**
     * constructor
     * @param  object   Config to initialise the class with
     * @return void
     */
    constructor({

        // Config
        // -----

        limit = 100,
        warning = 25,
        danger = 10,
        // Threshold values
        // TODO - Potentially look at percentages as well as fixed figures?

        classInitField = 'cc-field',
        classCounter = 'cc-count',
        // DOM interaction classes

        classStateIsEmpty = 'cc-is-empty',
        classStateIsFine = 'cc-is-fine',
        classStateIsWarning = 'cc-is-warning',
        classStateIsDanger = 'cc-is-danger',
        classStateIsLimit = 'cc-is-limit',
        // DOM state classes


        // Callbacks
        // -----

        onFieldEmpty = (field, remaining) => {},
        // Fired when a fields text count is zero; not entirely sure on its continued usefulness

        onFieldFine = (field, remaining) => {},
        // Fired when a fields text remaining count is a-okay, after coming from another state

        onFieldWarning = (field, remaining) => {},
        // Fired when the desired warning threshold is reached

        onFieldDanger = (field, remaining) => {},
        // Fired when the desired danger threshold is reached

        onFieldLimit = (field, remaining) => {},
        // Fired when the limit is all used up!

    } = {}) {

        // TODO - Singleton removal, override limit based on maxlength for initd. field

        this.states = {
            empty: new State(limit, classStateIsEmpty),
            fine: new State((limit - 1), classStateIsFine),
            warning: new State(warning, classStateIsWarning),
            danger: new State(danger, classStateIsDanger),
            limit: new State(0, classStateIsLimit)
        };
        // Define states

        // this.activeState = null;
        // this.remainingCharacters = limit;
        // TODO - Implement when not singleton

        this.classInitField = classInitField;
        this.classCounter = classCounter;
        // Setup DOM interaction classes

        this.onFieldEmpty = onFieldEmpty;
        this.onFieldFine = onFieldFine;
        this.onFieldWarning = onFieldWarning;
        this.onFieldDanger = onFieldDanger;
        this.onFieldLimit = onFieldLimit;
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
     * Determine the field state, with the intention to fire events/manage active state
     * @param  object   field   JS element object
     * @return state
     */
    determineFieldState(field) {

        let remaining   = field.ccRemainingCharacters,
            fieldState  = field.ccActiveState,
            fieldLength = field.value.length;
        // Local storage

        if (fieldLength == 0) {

            if (fieldState !== 'empty') {

                this.onFieldEmpty(field, remaining);

                field.ccActiveState = 'empty';
            }
            // Fire callback, set active state

            return this.states.empty;
        }
        // Empty state trigger

        if (remaining <= this.states.limit.getThreshold()) {

            // if (!this.states.limit.isActive()) {

            //     this.onFieldLimit(field, remaining);

            //     this.states.limit.isActive(true);
            // }
            // TODO - Do this method when not singleton

            if (fieldState !== 'limit') {

                this.onFieldLimit(field, remaining);

                field.ccActiveState = 'limit';

            }
            // Fire callback, set active state

            return this.states.limit;
        }
        // Limit state trigger

        if (remaining <= this.states.danger.getThreshold()) {

            if (fieldState !== 'danger') {

                this.onFieldDanger(field, remaining);

                field.ccActiveState = 'danger';
            }
            // Fire callback, set active state

            return this.states.danger;
        }
        // Danger state trigger

        if (remaining <= this.states.warning.getThreshold()) {

            if (fieldState !== 'warning') {

                this.onFieldWarning(field, remaining);

                field.ccActiveState = 'warning';
            }
            // Fire callback, set active state

            return this.states.warning;
        }
        // Warning state trigger

        if (remaining <= this.states.fine.getThreshold()) {

            if (fieldState !== 'fine') {

                this.onFieldFine(field, remaining);

                field.ccActiveState = 'fine';
            }
            // Fire callback, set active state

            return this.states.fine;
        }
        // Fine state trigger
    }

    /**
     * Calculates remaining characters but will also need to fire callbacks
     * @param  object   field   JS element object
     * @return void
     */
    calculateRemainingCharacters(field) {

        let limit = (field.hasAttribute('maxlength') ? parseInt(field.getAttribute('maxlength')) : this.states.empty.getThreshold());
        // If there is a max length applied to the field, use that instead
        // TODO - Allow for toggling this behaviour via config

        field.ccRemainingCharacters = (limit - field.value.length);
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

        let counterMarkup = `<small class="${this.classCounter} ${activeColourClass}">${field.ccRemainingCharacters}</small>`;
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

        fieldCounter.textContent = field.ccRemainingCharacters;
        // Update remaining characters

        fieldCounter.className = `${this.classCounter} ${activeColourClass}`;
        // Set active class
    }
}
