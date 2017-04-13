angular.module('App').directive('twitchFeedItem', function () {
    return {
        'templateUrl': './App/Directives/Twitch/twitchFeedItem.html',
        'scope': {
            'stream': '='
        }
    }
});