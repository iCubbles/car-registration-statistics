/*globals _*/
'use strict';

document.addEventListener('cifReady', function(evt) {
    console.log('-----------------------------------------');
    var frame = document.querySelector('state-car-registration-statistics-frame');
    frame.classList.add('row');

    var divOverStates = document.createElement('div');
    divOverStates.classList.add('col-xs-5');
    divOverStates.classList.add('row');
    var divOverCharts = document.createElement('div');
    divOverCharts.classList.add('col-xs-7');
    console.log('frame.children', frame.children);
    var element;

    function getNextDataElement() {
        return _.find(frame.children, function(item) {
            return item.tagName.toLowerCase() === 'state-car-registration-data-draggable';
        });
    }

    while (typeof (element = getNextDataElement()) !== 'undefined') {
        divOverStates.appendChild(element);
        element.classList.add('col-md-12');
        element.classList.add('col-lg-6');
    }
    function getNextChartElement() {
        return _.find(frame.children, function(item) {
            return item.tagName.toLowerCase().indexOf('statistic-modul') === 0;
        });
    }

    while (typeof (element = getNextChartElement()) !== 'undefined') {
        divOverCharts.appendChild(element);
    }

    frame.appendChild(divOverStates);
    frame.appendChild(divOverCharts);
});
