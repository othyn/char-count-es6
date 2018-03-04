/**
 * A state to be used by CharCount
 */
export default class CharCountState {

    /**
     * constructor
     * @param  object   Config to initialise the class with
     * @return void
     */
    constructor(threshold = 0, colourClass = '') {

        this._threshold = threshold;
        this._colourClass = colourClass;
        // Init

        //this._active = false;
        // State current state
    }

    /**
     * Get the threshold value for the state instance
     * @return int  _threshold  value
     */
    get threshold() {

        return this._threshold;
    }

    /**
     * Set the threshold for the state instance
     * @param  int      threshold   threshold value
     * @return object   this        just incase you fancy method chaining
     */
    set threshold(threshold = 0) {

        this._threshold = threshold;

        return this;
    }

    /**
     * Get the colourClass for the state instance
     * @return string  _colourClass DOM class
     */
    get colourClass() {

        return this._colourClass;
    }

    /**
     * Set the colourClass for the state instance
     * @param  string   colourClass DOM class
     * @return object   this        just incase you fancy method chaining
     */
    set colourClass(colourClass = 0) {

        this._colourClass = colourClass;

        return this;
    }

    /**
     * Tells whos asking what the state of the state is. Yuh-huh!
     * @param  boolean  newState    update the state instance state
     * @return boolean              return the current state instance state
     */
    // isActive(newState = null) {

    //     if (newState !== null)
    //         this._active = newState;

    //     return this.active;
    // }
}
