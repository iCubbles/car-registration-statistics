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
        is: 'draggable-maker',

        cubxReady: function() {

            var draggableElement = this.root.parentNode.querySelector(this.getDraggableElement());
            draggableElement.setAttribute("draggable", "true");
            draggableElement.addEventListener('dragstart', this.handleDragStart);
            draggableElement.addEventListener('dragend', this.handleDragEnd);

            // set value-attribute of element with id='slota' to the initial value of slot 'a'
        },
        handleDragStart: function(e) {
            this.style.opacity = '0.4';
            var host = e.target.parentNode;
            //console.log('transportable-element:dragstart:host', host);
            var runtimeId = host.parentNode.getAttribute('runtime-id');
            e.dataTransfer.setData('runtimeId', runtimeId);
            e.dataTransfer.effectAllowed = 'move';
        },
        handleDragEnd: function(e) {
            e.target.style.opacity = '1';
        }
    });
}());
