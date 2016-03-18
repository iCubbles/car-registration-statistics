/*globals _*/
'use strict';

window.car_registration_statistic = {
  convertDataForChart: function (value, next) {
    var datasetList = [];
    var ordered = window.car_registration_statistic.last5YearsSortedLimitedhelper(value);

    var datasetTotal = [ 'total' ];
    var datasetPassengerCar = [ 'passanger cars' ];
    var datasetTrucks = [ 'trucks' ];
    var datasetTractors = [ 'tractors' ];
    var datasetMotorcycles = [ 'motorcycles' ];
    ordered.forEach(function (item) {
      datasetTotal.push(item.total);
      datasetPassengerCar.push(item[ 'passenger-cars' ]);
      datasetTrucks.push(item.trucks);
      datasetTractors.push(item.tractors);
      datasetMotorcycles.push(item.motorcycles);
    });
    datasetList.push(datasetTotal);
    datasetList.push(datasetPassengerCar);
    datasetList.push(datasetTrucks);
    datasetList.push(datasetTractors);
    datasetList.push(datasetMotorcycles);
    // console.log('convertDataForChart -> new Data', datasetList);
    next(datasetList);
  },
  convertDataForChartLabels: function (value, next) {
    var ordered = window.car_registration_statistic.last5YearsSortedLimitedhelper(value);
    var labels = [];
    ordered.forEach(function (item) {
      labels.push(item.date.substr(item.date.lastIndexOf('.') + 1));
    });
    next(labels);
  },

  convertDataForPieChart: function (value, next) {
    var datasetList = [];
    var ordered = window.car_registration_statistic.last5YearsSortedLimitedhelper(value);

    ordered.forEach(function (item) {
      var dataset = [];
      dataset.push(item.date.substr(item.date.lastIndexOf('.') + 1));
      dataset.push(item.total);

      datasetList.push(dataset);
    });

    next(datasetList);
  },
  last5YearsSortedLimitedhelper: function (value) {
    var limit = new Date(2010, 11, 31);
    var filtered = _.filter(value, function (item) {
      var dateStrArray = item.date.split('.');
      return new Date(Number(dateStrArray[ 2 ]), Number(dateStrArray[ 1 ] - 1), Number(
          dateStrArray[ 0 ])).getTime() >
        limit.getTime();
    });
    var ordered = _.sortByOrder(filtered, [
      function (item) {
        var dateStrArray = item.date.split('.');
        return new Date(Number(dateStrArray[ 2 ]), Number(dateStrArray[ 1 ] - 1), Number(
          dateStrArray[ 0 ])).getTime();
      } ], [ 'desc' ]);
    return ordered;
  }
};
