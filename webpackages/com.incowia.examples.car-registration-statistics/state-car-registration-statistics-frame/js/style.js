'use strict';

document.addEventListener('cifReady',function(evt){
    console.log('########## CIFREADY ################');

   var frame = document.querySelector('state-car-registration-statistics-frame');
   frame.classList.add('row');
   var statsList = document.querySelectorAll('state-car-registration-data-draggable');
   console.log('statsList',statsList);
    var i;
   for(i=0; i<statsList.length; i++){
       statsList[i].classList.add('col-xs-3');
   }
    var statModuls = document.querySelectorAll('statistic-modul-bar-chart');
    console.log('statModuls',statModuls);
    for(i=0; i<statModuls.length; i++) {
        statModuls[i].classList.add('col-xs-12');
    }
});
