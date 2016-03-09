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
        is: 'parent-dropzone',

        /**
         * Manipulate an element’s local DOM when the element is created.
         */
        created: function() {
        },

        /**
         * Manipulate an element’s local DOM when the element is created and initialized.
         */
        ready: function() {

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
            if (this.parentNode && this.parentNode.isCompoundComponent) {
                this.makeToDropzoneToParentCompound(this.parentNode, this);
            }

        },

        createConnection: function(source,target) {
            console.log('createConnection -> source', source);
            console.log('createConnection -> target', target);
            var dynamicConnection = new window.cubx.cif.DynamicConnection();
            dynamicConnection.setSourceRuntimeId(source.getAttribute('runtime-id'));
            dynamicConnection.setSourceSlot('data');
            dynamicConnection.setDestinationRuntimeId(target.getAttribute('runtime-id'));
            dynamicConnection.setDestinationSlot('data');
            dynamicConnection.setDirectExecution(true);
            var connectionId = source.addDynamicConnection(dynamicConnection);
            target.connectedWithId = connectionId;
        },

        makeToDropzoneToParentCompound: function(parentElem, elem) {

            //console.log('makeToDropzone', parentElem);
            parentElem.handleDragEnter = function(e) {
                if (e.target === parentElem) {
                    if (parentElem.classList.contains('layer_not_over')) {
                        parentElem.classList.remove('layer_not_over');
                    }
                    parentElem.classList.add('layer_over');
                }
            };
            parentElem.handleDragOver = function(e) {
                //console.log('dynamic-connection-compound:dragover', e.target);
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                return false;
            };
            parentElem.handleDragLeave = function(e) {
                console.log('---------dynamic-connection-compound:dragleave', e.target);
                if (e.target === parentElem) {
                    if (parentElem.classList.contains('layer_over')) {
                        parentElem.classList.remove('layer_over');
                    }
                    parentElem.classList.add('layer_not_over');  // this / e.target is previous target element.
                }
            };
            parentElem.handleDragEnd = function(e) {
                console.log('xxxxxxxxxxxxdynamic-connection-compound:dragend', e.target);

                if (parentElem.classList.contains('layer_over')) {
                    parentElem.classList.remove('layer_over');
                }
                parentElem.classList.add('layer_not_over');  // this / e.target is previous target element.

            };
            parentElem.handleDrop = function(e) {
                console.log('############drop in compound');
                if (e.stopPropagation) {
                    e.stopPropagation(); // stops the browser from redirecting.
                    var runtimeId = e.dataTransfer.getData('runtimeId');
                    var me = e.target;
                    console.log('handleDrop:me', me);

                    console.log('handleDrop -> runtimeId', runtimeId);
                    var draggedEl = elementFindByAttributeValue('runtime-id', runtimeId);
                    // console.log('me.contains(draggedEl)', me.contains(draggedEl));
                    //console.log('host',host);

                    var childElem = me.lastElementChild;
                    while (childElem !== me.firstElementChild && childElem.tagName !== draggedEl.tagName) {
                        childElem = childElem.previousElementSibling;
                    }
                    console.log('childElem', childElem);
                    if(parentElem.connectedWithId){
                        // TODO remove
                    }
                    elem.createConnection(draggedEl,parentElem);

                }
                return false;
            };
            parentElem.addEventListener('dragenter', parentElem.handleDragEnter);
            parentElem.addEventListener('dragover', parentElem.handleDragOver);
            parentElem.addEventListener('dragleave', parentElem.handleDragLeave);
            parentElem.addEventListener('dragend', parentElem.handleDragEnd);
            parentElem.addEventListener('drop', parentElem.handleDrop);
        }

    });
}());
