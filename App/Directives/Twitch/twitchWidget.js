angular.module('App').directive('twitchWidget', function () {
    return {
        'restrict': 'AEC',
        'templateUrl': './App/Directives/Twitch/twitchWidget.html',
        'scope': {
            'streams': '=',
            'title': '@'
        }
    }
});