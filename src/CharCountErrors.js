/**
 * Base error to be used by CharCount
 */
class CharCountError extends Error {

    constructor(message) {

        super(`CharCount: ${message}`);
        // Call parent constructor

        Error.captureStackTrace(this, this.constructor);
        // Capture the stack trace, excluding it's own call

        this.name = this.constructor.name;
        // Store name for reference
    }
}

/**
 * Invalid selector passed to initialise against
 */
export class SelectorError extends CharCountError {

    constructor(message, selector) {

        super(message);
        // Call parent constructor

        this.selector = selector;
        // Store the selector in question
    }
}
