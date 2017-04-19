angular.module('App', [
    'angularSpinner',
	'angular-ladda',
    'restangular',
    'yaru22.angular-timeago',
    'infinite-scroll'
])

.run(function () {
    var a = 0;
});

angular.module('App').controller('MinMaxCtrl', ['TwitchService', '$scope', '$interval', '$rootScope', function (TwitchService, $scope, $interval, $rootScope) {
    $scope.twitchService = TwitchService;
    $scope.twitchService.getChannels();

    $scope.widgets = [
        {type: 'twitch-widget', data:{title: 'Twitch'} },
        {type: 'reddit-widget', data:{subreddit: 'GlobalOffensive'} },
        {type: 'reddit-widget', data:{subreddit: 'PUBATTLEGROUNDS'} },
        {type: 'reddit-widget', data:{subreddit: 'KerbalSpaceProgram'} }
    ];

    $scope.intervalo = $interval(function() {
        $scope.twitchService.getChannels();
    }, 20000);

    $scope.search = function () {
        console.log("search pushed");
        console.log('TwitchService.search()', $scope.twitchService.search($scope.twitchNames));
    };

    $scope.twitch = function () {
        console.log("twitch pushed");
        console.log('TwitchService.getChannels()', $scope.twitchService.getChannels());
    };

    $scope.intervalo;
}]);