angular.module('App', [
	'angular-ladda',
    'restangular',
    'yaru22.angular-timeago',
    'infinite-scroll'
])

.run(function () {
    var a = 0;
});

angular.module('App').directive('twitchFeedItem', function () {
   return {
       'templateUrl': './App/Templates/Twitch/twitchFeedItem.html',
       'scope': {
           'stream': '='
       }
   }
});

angular.module('App').directive('twitchWidget', function () {
    return {
        'restrict': 'AEC',
        'templateUrl': './App/Templates/Twitch/twitchWidget.html',
        'scope': {
            'streams': '=',
            'title': '@'
        }
    }
});

angular.module('App').directive('redditWidget', function () {
    return {
        'restrict': 'AEC',
        'templateUrl': './App/Templates/Reddit/redditWidget.html',
        'scope': {
            'posts': '=',
            'title': '@',
            'redditService': '='
        }
    }
});

angular.module('App').directive('redditFeedItem', function () {
    return {
        'templateUrl': './App/Templates/Reddit/redditFeedItem.html',
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

angular.module('App').controller('MinMaxCtrl', ['TwitchService', 'RedditService', '$scope', '$interval', function (TwitchService, RedditService, $scope, $interval) {
    $scope.twitchService = TwitchService;
    $scope.twitchService.getChannels();

    $scope.redditService = RedditService;

    $scope.redditService.hot('GlobalOffensive', '');
    $scope.redditService.hot('PUBATTLEGROUNDS', '');
    $scope.redditService.hot('KerbalSpaceProgram', '');

    $scope.intervalo = $interval(function() {
        $scope.twitchService.getChannels();
        $scope.redditService.hot('GlobalOffensive', '');
        $scope.redditService.hot('PUBATTLEGROUNDS', '');
        $scope.redditService.hot('KerbalSpaceProgram', '');
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