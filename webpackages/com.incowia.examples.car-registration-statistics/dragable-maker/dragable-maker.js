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
        is: 'dragable-maker',

        cubxReady: function() {

            var dragableElement = this.root.parentNode.querySelector(this.getDragableElement());
            dragableElement.setAttribute("draggable","true");
            dragableElement.addEventListener('dragstart', this.handleDragStart);
            dragableElement.addEventListener('dragend', this.handleDragEnd);

            // set value-attribute of element with id='slota' to the initial value of slot 'a'
        },
        handleDragStart: function(e) {
            console.log('dragstart');
            this.style.opacity = '0.4';
            var host = e.target.parentNode;
            //console.log('transportable-element:dragstart:host', host);
            var runtimeId = host.getAttribute('runtime-id');
            e.dataTransfer.setData('runtimeId', runtimeId);
            e.dataTransfer.effectAllowed = 'move';
        },
        handleDragEnd: function(e) {
            console.log('dragend');
            e.target.style.opacity = '1';
        }
    });
}());
