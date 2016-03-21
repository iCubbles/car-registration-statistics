(function () {
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

    cubxReady: function () {
      var draggableElement = this.root.parentNode.querySelector(this.getDraggableElement());
      draggableElement.setAttribute('draggable', 'true');
      draggableElement.addEventListener('dragstart', this.handleDragStart);
      draggableElement.addEventListener('dragend', this.handleDragEnd);

      // set value-attribute of element with id='slota' to the initial value of slot 'a'
    },
    handleDragStart: function (e) {
      this.style.opacity = '0.4';
      function findParentCompound (element) {
        if (element.parentNode.hasAttribute('cubx-core-crc')) {
          return null;
        }
        if (element.parentNode.isCompoundComponent) {
          return element.parentNode;
        } else {
          return findParentCompound(element.parentNode);
        }
      }

      var parentCompound = findParentCompound(e.target);
      if (parentCompound) {
        var runtimeId = parentCompound.getAttribute('runtime-id');
        var msie = window.navigator.userAgent.indexOf('MSIE ');       // Detect IE
        var trident = window.navigator.userAgent.indexOf('Trident/'); // Detect IE 11
        var edge = window.navigator.userAgent.indexOf('Edge'); // Detect Edge

        if (msie > 0 || trident > 0 || edge > 0) {
          e.dataTransfer.setData('Text', runtimeId);
        } else {
          e.dataTransfer.setData('runtimeId', runtimeId);
        }
      }
      // var host = e.target.parentNode;
      // console.log('transportable-element:dragstart:host', host);
      e.dataTransfer.effectAllowed = 'move';
    },
    handleDragEnd: function (e) {
      e.target.style.opacity = '1';
    }

  });
}());
