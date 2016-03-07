(function() {
    'use strict';
    /**
     * Get help:
     * > Lifecycle callbacks:
     * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
     *
     * Access the Cubbles-Component-Model:
     * > Access slot values:
     * slot 'a': this.getA(); | this.setA(value)
     */
    CubxPolymer({
        is: 'state-car-registration-data',

        /**
         * Manipulate an element’s local DOM when the element is created.
         */
        created: function() {
        },

        /**
         * Manipulate an element’s local DOM when the element is created and initialized.
         */
        ready: function() {
            this.scopeSubtree(this.root, true);

        },

        /**
         * Manipulate an element’s local DOM when the element is attached to the document.
         */
        attached: function() {
        },

        /**
         * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
         */
        cubxReady: function() {
        }

    });
}());
