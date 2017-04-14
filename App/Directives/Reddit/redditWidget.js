angular.module('App').directive('redditWidget', function () {
    return {
        'restrict': 'AEC',
        'templateUrl': './App/Directives/Reddit/redditWidget.html',
        'scope': {
            'posts': '=',
            'title': '@',
            'subreddit': '@',
            'after': '=',
            'newPosts': '='
        },
        'controller': function redditWidgetController($scope,RedditService) {
            $scope.randomId = Math.floor((Math.random()*10000)+1);

            $scope.pagination = function () {
                RedditService.pagination($scope.subreddit);
            }
        }
    }
});