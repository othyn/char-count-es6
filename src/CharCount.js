import CharCountCore from './core/CharCountCore';

/**
 * Factory (& entry point) for CharCount instantiation
 */
export default class CharCount {

    /**
     * constructor
     * @param  {object} Config to initialise the class with
     * @return {void}
     */
    constructor(options) {

        this.options = Object.assign({selector: 'cc-field'}, options);
        // Options to init all instances with

        this.instances = [];
        // Stores all active instances for reference

        this.initElements();
        // Initialisation depends on the outcome of the type of selector passed

        delete this.options;
    }

    /**
     * Finds the elements based on the selector passed and initialises a class against them
     * @return {void}
     */
    initElements() {

        if (this.options.selector && this.options.selector.nodeType === Node.ELEMENT_NODE) {

            // Element passed, go straight to init - because why not?

            this.createInstance( this.options.selector );

        } else if (document.getElementById(this.options.selector) !== null) {

            // ID passed, go ahead and initialise this instance only against the requested element

            this.createInstance( document.getElementById(this.options.selector) );

        } else if (document.getElementsByClassName(this.options.selector).length !== 0) {

            // Class passed, go ahead and initialise all instances by element

            let elements = document.getElementsByClassName(this.options.selector);
            // Pull all DOM elements to initialise into an HTMLCollection

            Array.from(elements, el => {

                this.createInstance(el);

            });
            // Create a new instance for each element

        } else {

            console.warn('No elements found with supplied selector:', this.options.selector);
        }
        // Determine what the instance needs to initialise as
    }

    /**
     * Create the required instances from the init options and sourced element
     * @param {object}  element DOM element to init the class instance against
     * @return {void}
     */
    createInstance(element) {

        let params = Object.assign({element: element}, this.options);
        // Core class requires initialisation via element, so pass it on in there!

        let newInstance = new CharCountCore(params);

        this.instances.push( newInstance );
        // For reference in returned factory instance

        element.CharCount = newInstance;
        // Register the instance against the element directly
    }
}
