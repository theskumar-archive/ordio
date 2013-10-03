'use strict';

angular.module('ordioApp')
  .controller('MainCtrl', ['$scope', '$timeout', '$http', '$location', '$filter', 'settings', function($scope, $timeout, $http, $location, $filter, settings) {
    $scope.loaded = false;
    $scope.refresh = function(){
        var mainReq = $http.get(settings.base_url);

        mainReq.then(function(response){
            $scope.data = response.data;
            console.log("refreshed data....");
            console.log(response.data.server.msg);
            $scope.loaded = true;
        });
    };

    $scope.init = function(){
        var dbReq = $http.get(settings.base_url+'list/');

        $scope.autoRefresh();

        dbReq.then(function(response){
            $scope.db = response.data.request;

            $scope.$watch('userQuery', function(value){
                if(value && value.length >= 4){
                    $scope.filteredTracks = $filter('filter')($scope.db.tracks, value);
                    $scope.query = $scope.userQuery;
                }
                else
                {
                    $scope.query = null;
                }
            });

            console.log(response.data.request.msg);
        });
    };

    $scope.control = function(command){
        console.log(command + 'command sent');
        var controlReq = $http.get(settings.base_url+'control/'+command+'/');
    };

    $scope.add = function(track){
        $scope.refresh();
        $scope.showPlaylist = true;
        hideTimer = $timeout(function(){
            $scope.showPlaylist = false;
        }, 5000);

        var addReq = $http({method: 'POST', url: settings.base_url+'add/',data: JSON.stringify(track)});

        addReq.then(function(response){
            $scope.refresh();
            $scope.query = null;
            console.log(response.data.request.msg);
        });
    };

    $scope.autoRefresh = function(){
        $scope.refresh();

        $scope.timer = $timeout(function() {
            $scope.autoRefresh();
        }, 1000);
    };

    $scope.init();

  }]);
