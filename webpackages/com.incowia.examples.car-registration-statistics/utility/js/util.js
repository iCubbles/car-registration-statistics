'use strict';

window.carRegistrationStatistics = {
  findParentCompound: function (element) {
    if (element.parentNode.hasAttribute('cubx-core-crc')) {
      return null;
    }
    if (element.parentNode.isCompound) {
      return element.parentNode;
    } else {
      return window.carRegistrationStatistic.findParentCompound(element.parentNode);
    }
  }
};
