'use strict';

document.addEventListener('cifReady',function(evt){
   var nodeList = document.querySelectorAll('state-car-registration-data');
    console.log('nodeList',nodeList)
   for(var i=0; i<nodeList.length; i++){
       nodeList[i].classList.add('row');
   }
});
