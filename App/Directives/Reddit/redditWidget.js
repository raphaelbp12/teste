angular.module('App').directive('redditWidget', function () {
    return {
        'restrict': 'AEC',
        'templateUrl': './App/Directives/Reddit/redditWidget.html',
        'scope': {
            'posts': '=',
            'title': '@',
            'subreddit': '@',
            'after': '=',
            'newPosts': '=',
            'topic': '@'
        },
        'controller': function redditWidgetController($scope,RedditService) {
            $scope.redditService = RedditService;

            $scope.topics = ['hot', 'new', 'top', 'rising', 'controversial', 'gilded', 'promoted'];

            $scope.randomId = Math.floor((Math.random()*10000)+1);

            $scope.showMenu = false;

            $scope.triggerMenu = function () {
                $scope.showMenu = !$scope.showMenu;
            };

            $scope.changeTopic = function (topic) {
                RedditService.changeTopic($scope.subreddit, topic);
                $scope.triggerMenu();
                $scope.topic = topic;
            };

            $scope.showNotification = function(eleId){
                RedditService.showNotification($scope.subreddit);
                $('#'+eleId).scrollTop(0);
            };

            $scope.pagination = function () {
                RedditService.pagination($scope.subreddit);
            };
        }
    }
});