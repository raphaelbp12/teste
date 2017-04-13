angular.module('App').directive('redditFeedItem', function () {
    return {
        'templateUrl': './App/Directives/Reddit/redditFeedItem.html',
        'scope': {
            'post': '='
        },
        'controller': function redditFeedItemController($scope) {
            $scope.validUrl = function (str) {
                var ret = str.split(".");
                //console.log("ret", ret);
                return ret.length > 1;
            }
        }
    }
});