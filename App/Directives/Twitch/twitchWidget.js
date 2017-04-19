angular.module('App').directive('twitchWidget', function () {
    return {
        'restrict': 'AEC',
        'templateUrl': './App/Directives/Twitch/twitchWidget.html',
        'scope': {
            'content': '='
        },
        'controller': function twitchWidgetController($scope,TwitchService, $interval) {
            $scope.twitchService = TwitchService;

            $scope.title = $scope.content.title;
        }
    }
});