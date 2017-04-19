angular.module('App').directive('redditWidget', function () {
    return {
        'restrict': 'AEC',
        'templateUrl': './App/Directives/Reddit/redditWidget.html',
        'scope': {
            'content': '='
        },
        'controller': function redditWidgetController($scope,RedditService, $interval) {

            $scope.subreddit = $scope.content.subreddit;

            $scope.redditService = RedditService;

            $scope.topics = ['hot', 'new', 'top', 'rising', 'controversial', 'gilded', 'promoted'];

            $scope.data = {};

            $scope.loading = true;

            $scope.redditService.getSubreddit($scope.subreddit, 'hot', '', false).then(function(data){
                console.log('redditService', $scope.subreddit, data);
                $scope.loading = false;
                $scope.data = data;
            });

            $interval(function() {
                $scope.redditService.getUpdate($scope.subreddit);
            }, 20000);

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
                if(!$scope.loading) {
                    $scope.loading = true;
                    //console.log('comecou o loading', $scope.randomId);
                    $scope.redditService.pagination($scope.subreddit).then(function (data) {
                        $scope.loading = false;
                        //console.log('terminou o loading', $scope.randomId);
                    });
                }
            };
        }
    }
});