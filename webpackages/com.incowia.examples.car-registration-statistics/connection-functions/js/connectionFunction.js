/*globals _*/
'use strict';

window.car_registration_statistic = {
    convertDataForBarChart: function(value, next) {
        var datasetList = [];
        var ordered = window.car_registration_statistic.last5YearsSortedhelper(value);

        var datasetTotal = ['total'];
        var datasetPassengerCar = ['passanger cars'];
        var datasetTrucks = ['trucks'];
        var datasetTractors = ['tractors'];
        var datasetMotorcycles = ['motorcycles'];
        ordered.forEach(function(item) {

            datasetTotal.push(item.total);
            datasetPassengerCar.push(item['passenger-cars']);
            datasetTrucks.push(item.trucks);
            datasetTractors.push(item.tractors);
            datasetMotorcycles.push(item.motorcycles);

        });
        datasetList.push(datasetTotal);
        datasetList.push(datasetPassengerCar);
        datasetList.push(datasetTrucks);
        datasetList.push(datasetTractors);
        datasetList.push(datasetMotorcycles);
        console.log('convertDataForBarChart',datasetList);
        next(datasetList);
    },
    convertDataForBarChartLabels: function(value, next) {
        var ordered = window.car_registration_statistic.last5YearsSortedhelper(value);
        var labels = [];
        ordered.forEach(function(item) {
            labels.push(item.date.substr(item.date.lastIndexOf('.') + 1));
        });
        console.log('convertDataForBarChartLabels', labels);
        next(labels);
    },
    last5YearsSortedhelper: function(value) {
        var limit = new Date(2010, 11, 31);
        var filtered = _.filter(value, function(item) {
            var dateStrArray = item.date.split('.');
            return new Date(Number(dateStrArray[2]), Number(dateStrArray[1] - 1), Number(dateStrArray[0])).getTime() >
                limit.getTime();
        });
        var ordered = _.sortByOrder(filtered, [
            function(item) {
                var dateStrArray = item.date.split('.');
                return new Date(Number(dateStrArray[2]), Number(dateStrArray[1] - 1), Number(
                    dateStrArray[0])).getTime();
            }], ['desc']);
        console.log('last5YearsSortedhelper ordered', ordered);
        return ordered;
    }

};
