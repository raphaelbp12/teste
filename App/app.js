angular.module('App', [
	'angular-ladda',
    'restangular',
    'yaru22.angular-timeago',
    'infinite-scroll'
])

.run(function () {
    var a = 0;
});

angular.module('App').controller('MinMaxCtrl', ['TwitchService', 'RedditService', '$scope', '$interval', function (TwitchService, RedditService, $scope, $interval) {
    $scope.twitchService = TwitchService;
    $scope.twitchService.getChannels();

    $scope.redditService = RedditService;

    $scope.redditService.getSubreddit('GlobalOffensive', 'hot', '');
    $scope.redditService.getSubreddit('PUBATTLEGROUNDS', 'hot', '');
    $scope.redditService.getSubreddit('KerbalSpaceProgram', 'hot', '');

    $scope.intervalo = $interval(function() {
        $scope.twitchService.getChannels();
        $scope.redditService.getSubreddit('GlobalOffensive', 'hot', '');
        $scope.redditService.getSubreddit('PUBATTLEGROUNDS', 'hot', '');
        $scope.redditService.getSubreddit('KerbalSpaceProgram', 'hot', '');
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

    $scope.pagination =function () {
        console.log("$scope.pagination");
    }
}]);