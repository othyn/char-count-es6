/**
 * A state to be used by CharCount
 */
export default class State {

    /**
     * constructor
     * @param  object   Config to initialise the class with
     * @return void
     */
    constructor(threshold = 0, colourClass = '') {

        this.threshold = threshold;
        this.colourClass = colourClass;
        // Init

        //this.active = false;
        // State current state
    }

    /**
     * Get the threshold value for the state instance
     * @return int  threshold value
     */
    getThreshold() {

        return this.threshold;
    }

    /**
     * Set the threshold for the state instance
     * @param  int      threshold   threshold value
     * @return object   this        just incase you fancy method chaining
     */
    setThreshold(threshold = 0) {

        this.threshold = threshold;

        return this;
    }

    /**
     * Get the colourClass for the state instance
     * @return string   DOM class
     */
    getColourClass() {

        return this.colourClass;
    }

    /**
     * Set the colourClass for the state instance
     * @param  string   colourClass DOM class
     * @return object   this        just incase you fancy method chaining
     */
    setColourClass(colourClass = 0) {

        this.colourClass = colourClass;

        return this;
    }

    /**
     * Tells whos asking what the state of the state is. Yuh-huh!
     * @param  boolean  newState    update the state instance state
     * @return boolean              return the current state instance state
     */
    // isActive(newState = null) {

    //     if (newState !== null)
    //         this.active = newState;

    //     return this.active;
    // }
}
