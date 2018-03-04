import State from './CharCountState';
// import * as Errors from './CharCountErrors';

/**
 * Counts characters, so you don't have to!
 *
 * TODO: Currently Singleton, this would greatly benefit from an instance per element
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

        warningThreshold: warning = 25,
        dangerThreshold: danger = 10,
        limitThreshold: limit = 100,
        // Threshold values
        // TODO: Potentially look at percentages as well as fixed figures?

        selector = 'cc-field',
        classCounter = 'cc-count',
        // DOM interaction classes

        classStateIsEmpty = 'cc-is-empty',
        classStateIsFine = 'cc-is-fine',
        classStateIsWarning = 'cc-is-warning',
        classStateIsDanger = 'cc-is-danger',
        classStateIsExpended = 'cc-is-expended',
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

        onFieldExpended = (field, remaining) => {},
        // Fired when the limit is all used up!

    } = {}) {

        // TODO: Singleton removal, override limit based on maxlength for initd. field

        this.states = {
            empty: new State(0, classStateIsEmpty),
            fine: new State(limit, classStateIsFine),
            warning: new State(warning, classStateIsWarning),
            danger: new State(danger, classStateIsDanger),
            expended: new State(0, classStateIsExpended)
        };
        // Define states

        // this.activeState = null;
        // this.remainingCharacters = limit;
        // TODO: Implement when not singleton

        this.selector = selector;
        this.classCounter = classCounter;
        // Setup DOM interaction classes

        this.onFieldEmpty = onFieldEmpty;
        this.onFieldFine = onFieldFine;
        this.onFieldWarning = onFieldWarning;
        this.onFieldDanger = onFieldDanger;
        this.onFieldExpended = onFieldExpended;
        // Register callbacks

        this.instances = [];
        // Stores all active instances of the class

        this.findElements();
        // Start the process to bind the class onto the specified DOM element(s)
    }

    /**
     * Finds the elements to be bound to the class
     * @return void
     */
    findElements() {

        // Conditional assignments won't get passed eslint, event with "no-cond-assign" set
        // So unsure whether its good practice in JS. I just miss if (let ...) ...

        if (this.selector && this.selector.nodeType === Node.ELEMENT_NODE) {

            // Element passed, this usually means that the class has been initialised internally

            this.bindElement(this.selector);

        } else if (document.getElementById(this.selector) !== null) {

            // ID passed, go ahead and initialise this instance only against the requested element

            this.bindElement( document.getElementById(this.selector) );

        } else if (document.getElementsByClassName(this.selector).length !== 0) {

            // Class passed, go ahead and initialise all instances by element and store references
            // in this instance

            let elements = document.getElementsByClassName(this.selector);
            // Pull all DOM elements to initialise into an HTMLCollection

            Array.from(elements, el => {

                this.instances.push( new CharCount({selector: el}) );
                // TODO: Need to pass through parameters

            });
            // Create a new instance for each element, storing the initialised in this instance

        } else {

            return console.warn('No elements found with supplied selector', this.selector);
        }
        // Determine what the instance needs to initialise as
    }

    /**
     * Bind the required events onto the element / determine initial state
     * @param  object   element   DOM element
     * @return void
     */
    bindElement(element) {

        element.addEventListener('input', this.handleInputEvent.bind(this));
        // Register the event listener to the DOM elements required

        this.calculateRemainingCharacters(element);
        // Calculate initial counts for each element
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

        if (fieldLength === 0) {

            if (fieldState !== 'empty') {

                this.onFieldEmpty(field, remaining);

                field.ccActiveState = 'empty';
            }
            // Fire callback, set active state

            return this.states.empty;
        }
        // Empty state trigger

        if (remaining <= this.states.expended.threshold) {

            // if (!this.states.expended.isActive()) {

            //     this.onFieldExpended(field, remaining);

            //     this.states.expended.isActive(true);
            // }
            // TODO: Do this method when not singleton

            if (fieldState !== 'expended') {

                this.onFieldExpended(field, remaining);

                field.ccActiveState = 'expended';

            }
            // Fire callback, set active state

            return this.states.expended;
        }
        // Limit state trigger

        if (remaining <= this.states.danger.threshold) {

            if (fieldState !== 'danger') {

                this.onFieldDanger(field, remaining);

                field.ccActiveState = 'danger';
            }
            // Fire callback, set active state

            return this.states.danger;
        }
        // Danger state trigger

        if (remaining <= this.states.warning.threshold) {

            if (fieldState !== 'warning') {

                this.onFieldWarning(field, remaining);

                field.ccActiveState = 'warning';
            }
            // Fire callback, set active state

            return this.states.warning;
        }
        // Warning state trigger

        if (remaining <= this.states.fine.threshold) {

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

        let limit = (field.hasAttribute('maxlength') ? parseInt(field.getAttribute('maxlength')) : this.states.fine.threshold);
        // If there is a max length applied to the field, use that instead
        // TODO: Allow for toggling this behaviour via config

        field.ccRemainingCharacters = (limit - field.value.length);
        // Perform count on the field against the limit

        let activeState = this.determineFieldState(field);
        // Get the active state determined by the result of the calculation

        let potentialFieldCounter = field.nextElementSibling;
        // Get the next element to check for counters existence
        // TODO: Allow for elements that aren't situated directly below field

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

        let activeColourClass = activeState.colourClass;
        // Go get the active colour class

        let counterMarkup = `<small class="${this.classCounter} ${activeColourClass}">${field.ccRemainingCharacters}</small>`;
        // Generate counter markup
        // TODO: Allow this to be templated?

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

        let activeColourClass = activeState.colourClass;
        // Go get the active colour class

        fieldCounter.textContent = field.ccRemainingCharacters;
        // Update remaining characters

        fieldCounter.className = `${this.classCounter} ${activeColourClass}`;
        // Set active class
    }
}
